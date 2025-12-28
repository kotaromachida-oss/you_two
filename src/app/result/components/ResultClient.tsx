'use client';
import { useEffect, useMemo, useState } from 'react';

import Card from '@/components/Card';
import Link from 'next/link';
import styles from './ResultModal.module.css';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import ResultModal from './ResultModal';
import { DeviationValueRange } from '@/lib/scoring-tables';
import { getRankInfo } from '@/lib/scoring-engine';


export default function ResultClient({ decodedData }: { decodedData: { userAgeGroup: string; totalScore: number } }) {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDiagnoser, setIsDiagnoser] = useState(false);

  const deviation = useMemo(() => getRankInfo(decodedData.totalScore), [decodedData.totalScore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentUrl(window.location.href);

    if (!deviation) return;

    const diagnosticResult = sessionStorage.getItem('diagnostic_result');
    if (diagnosticResult === 'true') {
      setIsDiagnoser(true);

      if (deviation.min >= 40) {
        setShowModal(true);
      }
    }
  }, [deviation]);

  if (!deviation) {
    return <></>;
  }

  return (
    <>
      {showModal && <ResultModal deviation={deviation} userAgeGroup={decodedData.userAgeGroup} />}
      <Card>
        <div>
          <div className={styles.header}>
            <h1>パワーカップル偏差値</h1>
            <h2 className={styles.deviationValue}>{deviation.deviation}</h2>
          </div>

          {
            deviation.rank && (
              <p className={styles.rank}>
                上位<span className={styles.rankNumber}>{deviation.rank}</span>%
              </p>
            )
          }

          <p className={styles.certification}>{deviation.certification}</p>

          <div className={styles.commentBlock}>
            <p>{deviation.comment}</p>
          </div>

          <div className={styles.shareButtonWrapper}>
            {isDiagnoser && (
              <Link 
                href={`https://x.com/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`あなたのパワーカップル偏差値は${deviation.deviation}です。`)}`} 
                rel="nofollow" 
                target="_blank" 
                className={styles.shareButton}
              >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_76_71)">
                    <path d="M9.52217 6.92379L15.4785 0H14.0671L8.89516 6.01183L4.76437 0H0L6.24656 9.09095L0 16.3516H1.41155L6.87321 10.0029L11.2356 16.3516H16L9.52183 6.92379H9.52217ZM7.58887 9.17104L6.95596 8.26579L1.92015 1.06259H4.0882L8.15216 6.8758L8.78507 7.78105L14.0677 15.3373H11.8997L7.58887 9.17139V9.17104Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_76_71">
                      <rect width="16" height="16.36" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span>シェアする</span>
              </Link>
            )}
            <Link href="/">
              <Button variant="secondary">もう一度診断する</Button>
            </Link>
          </div>

        </div>
      </Card>
    </>
  );
}
