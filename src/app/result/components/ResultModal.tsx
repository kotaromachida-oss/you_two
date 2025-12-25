'use client';

import styles from './ResultModal.module.css';
import FormWrapper from '@/components/FormWrapper';
import FormLabel from '@/components/FormLabel';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import IconEmail from '@/components/Icons/email';
import TextField from '@/components/TextField';
import Tag from '@/components/Tag';
import { AGE_GROUP_OPTIONS, DeviationValueRange } from '@/lib/scoring-tables';
import { useState } from 'react';

export default function ResultModal({ deviation, userAgeGroup }: { deviation: DeviationValueRange; userAgeGroup: string }) {
  const [ isOpen, setOpen ] = useState(true);
  const [ email, setEmail ] = useState('');
  const [ isSending, setIsSending ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const ageLabel = AGE_GROUP_OPTIONS.find(option => option.value === userAgeGroup)?.label;

  const handleSendInvitation = async () => {
    if (!email) return;
    
    setIsSending(true);
    setError(null);
    
    try {
      const response = await fetch('/api/send-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <div>
        <div className={styles.header}>
          <h1>パワーカップル偏差値</h1>
          <h2 className={styles.deviationValue}>{deviation.deviation}</h2>
        </div>

        <div className={styles.tagGroup}>
          {ageLabel && <Tag size="md">{ageLabel}の評価</Tag>}
        </div>

        <div className={styles.messageBlock}>
          <span className={styles.iconContainer}>
            <IconEmail size={24} />
          </span>
          
          <p><b>おめでとうございます！</b></p>
          <p><small>あなたは{deviation.certification}です。</small></p>
          <p className={styles.messageInvitation}><strong>審査制パワーカップルサービスYou two</strong>への<br />招待状をお送りします</p>
        </div>

        <div className={styles.formWrapper}>
          <FormWrapper className={styles.formInner}>
            <FormLabel htmlFor="invitationEmail">メールアドレス</FormLabel>
            <TextField 
              type="email" 
              id="invitationEmail" 
              prefixIcon={<IconEmail size={24} />} 
              placeholder="メールアドレス" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSending}
            />
          </FormWrapper>
          {error && <p className={styles.errorText}>{error}</p>}
          <Button 
            variant="primary" 
            onClick={handleSendInvitation} 
            disabled={isSending || !email}
          >
            {isSending ? '送信中...'
            : isSuccess ? '送信済み'
            : '招待を受け取る'}
          </Button>
        </div>

      </div>
    </Modal>
  )
}
