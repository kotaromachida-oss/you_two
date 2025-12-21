import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import InvitationEmail from '@/emails/invitation-email';

// ビルド時のエラー回避のため、APIキーがない場合はダミーを使用
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    // キャンペーン期間の判定（未設定の場合はfalse）
    const campaignStart = process.env.NEXT_PUBLIC_CAMPAIGN_START;
    const campaignEnd = process.env.NEXT_PUBLIC_CAMPAIGN_END;
    const now = new Date();
    const isCampaignActive = !!(
      campaignStart && 
      campaignEnd && 
      now >= new Date(campaignStart) && 
      now <= new Date(campaignEnd)
    );

    const { data, error } = await resend.emails.send({
      from: 'You two <onboarding@resend.dev>', // 注意: 商用環境ではドメイン認証が必要
      to: email,
      subject: type === 'confirmed' 
        ? '【You two】会員クラブへのご招待' 
        : '【You two】特別なご案内',
      react: InvitationEmail({ type, isCampaignActive }),
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
