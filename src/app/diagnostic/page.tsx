'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateDiagnosticResult } from '@/utils/scoring';
import { encodeResultToUrl } from '@/lib/scoring-encoder';
import { AGE_GROUP_OPTIONS, type AgeGroup } from '@/lib/scoring-tables';
import styles from './page.module.css';

export default function DiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // フォームデータ
  const [userCompany, setUserCompany] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [userIncome, setUserIncome] = useState('');
  
  const [partnerCompany, setPartnerCompany] = useState('');
  const [partnerPosition, setPartnerPosition] = useState('');
  const [partnerIncome, setPartnerIncome] = useState('');
  
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('20s_late');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // バリデーション
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!userIncome || isNaN(Number(userIncome)) || Number(userIncome) < 0) {
        newErrors.userIncome = '年収を正しく入力してください';
      }
    } else if (currentStep === 2) {
      if (!partnerIncome || isNaN(Number(partnerIncome)) || Number(partnerIncome) < 0) {
        newErrors.partnerIncome = '年収を正しく入力してください';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };
  
  const handleSubmit = () => {
    if (!validateStep(step)) return;
    
    // 診断結果を計算
    const result = calculateDiagnosticResult({
      user: {
        company: userCompany,
        position: userPosition,
        annualIncome: Number(userIncome),
      },
      partner: {
        company: partnerCompany,
        position: partnerPosition,
        annualIncome: Number(partnerIncome),
      },
      ageGroup,
    });
    
    // 結果をURLエンコード
    const encoded = encodeResultToUrl(result);
    
    // 結果ページへ遷移
    router.push(`/result?data=${encoded}`);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.card} scale-in`}>
          {/* プログレスバー */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          
          <div className={styles.header}>
            <p className={styles.stepLabel}>Step {step} / 3</p>
            <h2 className={styles.title}>
              {step === 1 && 'あなたの情報を入力'}
              {step === 2 && 'パートナーの情報を入力'}
              {step === 3 && '年齢層を選択'}
            </h2>
          </div>
          
          <div className={styles.formContent}>
            {/* Step 1: あなたの情報 */}
            {step === 1 && (
              <div className="fade-in">
                <div className={styles.formGroup}>
                  <label className="label">所属企業（任意）</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="例: サイバーエージェント"
                    value={userCompany}
                    onChange={(e) => setUserCompany(e.target.value)}
                  />
                  <p className={styles.hint}>※ 表示のみで、スコアには影響しません</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label className="label">役職（任意）</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="例: マネージャー"
                    value={userPosition}
                    onChange={(e) => setUserPosition(e.target.value)}
                  />
                  <p className={styles.hint}>※ 表示のみで、スコアには影響しません</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label className="label">年収（万円）<span className={styles.required}>*</span></label>
                  <input
                    type="number"
                    className="input"
                    placeholder="例: 700"
                    value={userIncome}
                    onChange={(e) => setUserIncome(e.target.value)}
                  />
                  {errors.userIncome && (
                    <p className="error-message">{errors.userIncome}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: パートナーの情報 */}
            {step === 2 && (
              <div className="fade-in">
                <div className={styles.formGroup}>
                  <label className="label">所属企業（任意）</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="例: 日本製鉄"
                    value={partnerCompany}
                    onChange={(e) => setPartnerCompany(e.target.value)}
                  />
                  <p className={styles.hint}>※ 表示のみで、スコアには影響しません</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label className="label">役職（任意）</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="例: 一般社員"
                    value={partnerPosition}
                    onChange={(e) => setPartnerPosition(e.target.value)}
                  />
                  <p className={styles.hint}>※ 表示のみで、スコアには影響しません</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label className="label">年収（万円）<span className={styles.required}>*</span></label>
                  <input
                    type="number"
                    className="input"
                    placeholder="例: 450"
                    value={partnerIncome}
                    onChange={(e) => setPartnerIncome(e.target.value)}
                  />
                  {errors.partnerIncome && (
                    <p className="error-message">{errors.partnerIncome}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 3: 年齢層選択 */}
            {step === 3 && (
              <div className="fade-in">
                <div className={styles.ageGroupGrid}>
                  {AGE_GROUP_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      className={`${styles.ageGroupButton} ${
                        ageGroup === option.value ? styles.ageGroupButtonActive : ''
                      }`}
                      onClick={() => setAgeGroup(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* ナビゲーションボタン */}
          <div className={styles.navigation}>
            {step > 1 && (
              <button
                className="btn btn-secondary"
                onClick={handleBack}
                type="button"
              >
                戻る
              </button>
            )}
            
            {step < 3 ? (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                type="button"
              >
                次へ
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                type="button"
              >
                診断結果を見る
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
