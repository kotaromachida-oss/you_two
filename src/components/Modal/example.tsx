'use client';

import { useState } from 'react';
import Modal from './index';

/**
 * Modalコンポーネントの使用例
 * このファイルは参考用です。実際のプロジェクトでは削除しても構いません。
 */
export default function ModalExample() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isSlideUpOpen, setIsSlideUpOpen] = useState(false);
  const [isSlideDownOpen, setIsSlideDownOpen] = useState(false);
  const [isFadeOpen, setIsFadeOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Modal Component Examples</h1>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {/* 基本的なモーダル */}
        <button onClick={() => setIsBasicOpen(true)}>
          基本的なモーダル (Scale)
        </button>
        
        {/* スライドアップアニメーション */}
        <button onClick={() => setIsSlideUpOpen(true)}>
          スライドアップ
        </button>
        
        {/* スライドダウンアニメーション */}
        <button onClick={() => setIsSlideDownOpen(true)}>
          スライドダウン
        </button>
        
        {/* フェードアニメーション */}
        <button onClick={() => setIsFadeOpen(true)}>
          フェード
        </button>
        
        {/* 大きなモーダル */}
        <button onClick={() => setIsLargeOpen(true)}>
          大きなモーダル
        </button>
      </div>

      {/* 基本的なモーダル */}
      <Modal isOpen={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
        <h2>基本的なモーダル</h2>
        <p>これは基本的なモーダルです。スケールアニメーションで表示されます。</p>
        <p>ESCキーまたはオーバーレイをクリックして閉じることができます。</p>
        <button onClick={() => setIsBasicOpen(false)} style={{ marginTop: '1rem' }}>
          閉じる
        </button>
      </Modal>

      {/* スライドアップモーダル */}
      <Modal
        isOpen={isSlideUpOpen}
        onClose={() => setIsSlideUpOpen(false)}
        animationType="slide-up"
      >
        <h2>スライドアップモーダル</h2>
        <p>下からスライドして表示されます。</p>
        <button onClick={() => setIsSlideUpOpen(false)} style={{ marginTop: '1rem' }}>
          閉じる
        </button>
      </Modal>

      {/* スライドダウンモーダル */}
      <Modal
        isOpen={isSlideDownOpen}
        onClose={() => setIsSlideDownOpen(false)}
        animationType="slide-down"
      >
        <h2>スライドダウンモーダル</h2>
        <p>上からスライドして表示されます。</p>
        <button onClick={() => setIsSlideDownOpen(false)} style={{ marginTop: '1rem' }}>
          閉じる
        </button>
      </Modal>

      {/* フェードモーダル */}
      <Modal
        isOpen={isFadeOpen}
        onClose={() => setIsFadeOpen(false)}
        animationType="fade"
      >
        <h2>フェードモーダル</h2>
        <p>フェードインで表示されます。</p>
        <button onClick={() => setIsFadeOpen(false)} style={{ marginTop: '1rem' }}>
          閉じる
        </button>
      </Modal>

      {/* 大きなモーダル */}
      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        maxWidth="800px"
        maxHeight="80vh"
      >
        <h2>大きなモーダル</h2>
        <p>カスタムサイズのモーダルです。</p>
        <div style={{ marginTop: '1rem' }}>
          <p>長いコンテンツの例:</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>段落 {i + 1}: これは長いコンテンツの例です。</p>
          ))}
        </div>
        <button onClick={() => setIsLargeOpen(false)} style={{ marginTop: '1rem' }}>
          閉じる
        </button>
      </Modal>
    </div>
  );
}
