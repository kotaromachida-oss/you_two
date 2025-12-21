import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface InvitationEmailProps {
  type: 'confirmed' | 'potential';
  isCampaignActive?: boolean;
}

export default function InvitationEmail({
  type = 'confirmed',
  isCampaignActive = false,
}: InvitationEmailProps) {
  const lpUrl = process.env.NEXT_PUBLIC_LP_URL || 'https://youtwo.jp/';
  
  const title = type === 'confirmed' 
    ? 'You two会員クラブへの正式招待' 
    : 'You twoへ入会のチャンス';
    
  const message = type === 'confirmed'
    ? 'おめでとうございます。あなたの世帯は上位2%の「パワーカップル」に認定されました。つきましては、選ばれたカップルのみが参加できる会員制クラブ「You two」へ正式にご招待いたします。'
    : '診断の結果、あなたの世帯は上位7%の「ハイレベルパワーカップル」に認定されました。現在、特別な条件を満たす方向けに「You two」への入会枠をご案内しております。';

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 p-8 rounded-lg shadow-lg max-w-[600px]">
            <Section className="text-center mb-8">
              <Heading className="text-2xl font-bold text-navy-900 mb-2">You two</Heading>
              <Text className="text-sm text-gray-500 uppercase tracking-widest">Power Couple Club</Text>
            </Section>
            
            <Section className="text-center mb-8">
              <div className="inline-block bg-yellow-400 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-widest">
                INVITATION
              </div>
              <Heading className="text-xl font-bold text-gray-800 mb-4">{title}</Heading>
              <Text className="text-gray-600 leading-relaxed mb-6">
                {message}
              </Text>
              
              <Button
                className="bg-navy-800 text-white font-bold px-8 py-4 rounded-md shadow-md hover:bg-navy-700 transition-colors"
                href={lpUrl}
              >
                詳細・登録はこちら
              </Button>
            </Section>
            
            {isCampaignActive && (
              <Section className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-8">
                <Heading className="text-lg font-bold text-yellow-800 mb-2">期間限定キャンペーン実施中</Heading>
                <Text className="text-sm text-yellow-700">
                  クリスマス〜年末年始の期間中にご登録いただいた方の中から、抽選でスペシャル特典をプレゼントいたします。この機会をお見逃しなく。
                </Text>
              </Section>
            )}
            
            <Hr className="border-gray-200 my-6" />
            
            <Section className="text-center">
              <Text className="text-xs text-gray-400">
                © You two. All rights reserved.
              </Text>
              <Text className="text-xs text-gray-400 mt-2">
                このメールに心当たりがない場合は、破棄してください。
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
