import type { Metadata } from 'next';
import ResultClient from './components/ResultClient';
import { getRankInfo } from '@/lib/scoring-engine';
import { decodeResultFromUrl } from '@/lib/scoring-encoder';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const params = await searchParams;
  
  const data = decodeResultFromUrl(params.data as string);
  
  if (!data) {
    return {
      title: '診断結果 | パワーカップル診断 You two',
    };
  }

  const score = Number(data.totalScore);

  const deviation = getRankInfo(score);
  if (!deviation) {
    return {
      title: '診断結果 | パワーカップル診断 You two',
    };
  }

  const ogImageUrl = `/api/og-image?data=${params.data}`;

  return {
    title: `偏差値${deviation.deviation} | パワーカップル診断`,
    description: `${deviation.certification && `あなたは${deviation.certification}です。`}${deviation.comment}`,
    openGraph: {
      title: `パワーカップル偏差値：${deviation.deviation}`,
      description: `${deviation.certification && `あなたは${deviation.certification}です。`}${deviation.comment}`,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `パワーカップル偏差値：${deviation.deviation}`,
      description: `${deviation.certification && `あなたは${deviation.certification}です。`}${deviation.comment}`,
      images: [ogImageUrl],
    },
  };
}

export default async function ResultPage(
  { searchParams }: Props
) {
  const params = await searchParams;
  const data = decodeResultFromUrl(params.data as string);
  
  if (!data) {
    redirect('/');
  }

  return <ResultClient decodedData={data} />
}
