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

  const ageLabel = AGE_GROUP_OPTIONS.find(option => option.value === userAgeGroup)?.label;

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
          <p><strong>You two会員クラブ</strong>への招待状をお送りします</p>
        </div>

        <div className={styles.formWrapper}>
          <FormWrapper className={styles.formInner}>
            <FormLabel htmlFor="invitationEmail">メールアドレス</FormLabel>
            <TextField type="email" id="invitationEmail" prefixIcon={<IconEmail size={24} />} placeholder="メールアドレス" />
          </FormWrapper>
          <Button variant="primary">招待を受け取る</Button>
        </div>

      </div>
    </Modal>
  )
}
