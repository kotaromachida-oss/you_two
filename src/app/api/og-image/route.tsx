import { ImageResponse } from 'next/og';
import { decodeResultFromUrl } from '@/lib/scoring-encoder';
import { AGE_GROUP_OPTIONS } from '@/lib/scoring-tables';
import { getRankInfo } from '@/lib/scoring-engine';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get('data');
    
    // Google FontsからNoto Sans JP(通常/太字)とNoto Serif JP(太字)を取得
    const [notoSansData, notoSansBoldData, notoSerifBoldData] = await Promise.all([
      fetch('https://fonts.gstatic.com/s/notosansjp/v55/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf')
        .then((res) => res.arrayBuffer()),
      fetch('https://fonts.gstatic.com/s/notosansjp/v55/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75s.ttf')
        .then((res) => res.arrayBuffer()),
      fetch('https://fonts.gstatic.com/s/notoserifjp/v32/xn71YHs72GKoTvER4Gn3b5eMRtWGkp6o7MjQ2bzWPebA.ttf')
        .then((res) => res.arrayBuffer()),
    ]);
    
    // データがない場合はデフォルト画像
    if (!data) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1a2332',
              backgroundImage: 'radial-gradient(circle at 25px 25px, #d4af37 2%, transparent 0%), radial-gradient(circle at 75px 75px, #d4af37 2%, transparent 0%)',
              backgroundSize: '100px 100px',
              color: 'white',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(26, 35, 50, 0.9)',
                padding: '40px',
                borderRadius: '20px',
                border: '2px solid #d4af37',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', fontSize: 60, fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                You two
              </div>
              <div style={{ display: 'flex', fontSize: 30, color: '#f4d976', margin: '20px 0 0 0' }}>
                パワーカップル偏差値診断
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Noto Sans JP',
              data: notoSansData,
              style: 'normal',
              weight: 400,
            },
            {
              name: 'Noto Sans JP',
              data: notoSansBoldData,
              style: 'normal',
              weight: 700,
            },
            {
              name: 'Noto Serif JP',
              data: notoSerifBoldData,
              style: 'normal',
              weight: 700,
            },
          ],
        }
      );
    }

    // データをデコード
    const result = decodeResultFromUrl(data);
    
    // デコード失敗時
    if (!result) {
      return new Response('Invalid data', { status: 400 });
    }

    const deviation = getRankInfo(result.totalScore);
    const ageLabel = AGE_GROUP_OPTIONS.find(option => option.value === result.userAgeGroup)?.label;
    
    // ランク情報取得失敗時
    if (!deviation) {
      return new Response('Rank info not found', { status: 400 });
    }
    

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F6F5EE',
            fontFamily: '"Noto Sans JP", sans-serif',
          }}
        >

          {/* コンテンツコンテナ */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '85%',
            maxWidth: '640px',
            margin: '0 auto',
            padding: '40px',
            borderRadius: '16px',
            backgroundColor: '#fff',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Noto Serif JP',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '1.6',
              margin: '0 0 8px',
              textAlign: 'center',
            }}>
              パワーカップル偏差値
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div
                style={{
                  display: 'flex',
                  color: '#A89B57',
                  fontFamily: 'Noto Serif JP',
                  fontSize: '64px',
                  fontWeight: 700,
                  lineHeight: '1.6em',
                  textAlign: 'center',
                  letterSpacing: '0.1em',
                }}
              >{deviation.deviation}</div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '8px 0',
            }}>
              {ageLabel && <div style={{ display: 'flex', padding: '8px 16px', borderRadius: '24px', border: '1px solid #B3BEC6', color: '#B3BEC6', fontSize: '14px', fontWeight: 700, lineHeight: '24px' }} >{ageLabel}の評価</div>}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
              fontSize: '16px',
              lineHeight: '1.6',
            }}>
              {
                deviation.certification && <div style={{ display: 'flex', fontWeight: 700 }}>おめでとうございます！</div>
              }
              {
                deviation.certification && <div style={{ display: 'flex', fontSize: '14px' }}>あなたは{deviation.certification}です。</div>
              }
              <div style={{ display: 'flex', textAlign: 'center' }}>{deviation.comment}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans JP',
            data: notoSansData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Noto Sans JP',
            data: notoSansBoldData,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Noto Serif JP',
            data: notoSerifBoldData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
