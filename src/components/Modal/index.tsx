'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

export interface ModalProps {
  /** モーダルの開閉状態 */
  isOpen: boolean;
  /** モーダルを閉じる時のコールバック */
  onClose: () => void;
  /** モーダルのコンテンツ */
  children: React.ReactNode;
  /** 閉じるボタンを表示するか (デフォルト: true) */
  showCloseButton?: boolean;
  /** オーバーレイクリックで閉じるか (デフォルト: true) */
  closeOnOverlayClick?: boolean;
  /** ESCキーで閉じるか (デフォルト: true) */
  closeOnEscape?: boolean;
  /** モーダルの最大幅 (デフォルト: '500px') */
  maxWidth?: string;
  /** モーダルの最大高さ (デフォルト: '90vh') */
  maxHeight?: string;
  /** カスタムクラス名 */
  className?: string;
  /** オーバーレイのカスタムクラス名 */
  overlayClassName?: string;
  /** アニメーションタイプ (デフォルト: 'scale') */
  animationType?: 'scale' | 'slide-up' | 'slide-down' | 'fade';
}

export default function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  maxWidth = '640px',
  maxHeight = '90vh',
  className = '',
  overlayClassName = '',
  animationType = 'scale',
}: ModalProps) {
  // ESCキーでモーダルを閉じる
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // オーバーレイクリックでモーダルを閉じる
  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // モーダルが開いている時の処理
  useEffect(() => {
    if (isOpen) {
      // スクロールを無効化
      document.body.style.overflow = 'hidden';

      // ESCキーイベントリスナーを追加
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscape);
      }
    }

    return () => {
      // スクロールを有効化
      document.body.style.overflow = 'unset';

      // ESCキーイベントリスナーを削除
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, closeOnEscape, handleEscape]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`${styles.overlay} ${overlayClassName}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modal} ${styles[animationType]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth,
          maxHeight,
        }}
      >
        {showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="モーダルを閉じる"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
