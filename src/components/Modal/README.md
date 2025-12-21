# Modal Component

汎用的なモーダル Portal コンポーネントです。

## 特徴

- ✨ **Portal 実装**: `react-dom`の`createPortal`を使用して body 直下にレンダリング
- 🎨 **複数のアニメーション**: scale, slide-up, slide-down, fade の 4 種類
- ⌨️ **キーボード対応**: ESC キーでモーダルを閉じる
- 🎯 **アクセシビリティ**: ARIA 属性とセマンティック HTML
- 📱 **レスポンシブ**: モバイルデバイスに最適化
- 🔧 **カスタマイズ可能**: サイズ、スタイル、動作を柔軟に設定

## 基本的な使い方

```tsx
import Modal from "@/components/Modal";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>モーダルを開く</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>モーダルタイトル</h2>
        <p>モーダルのコンテンツがここに入ります。</p>
      </Modal>
    </>
  );
}
```

## Props

| Prop                  | 型                                                | デフォルト | 説明                                    |
| --------------------- | ------------------------------------------------- | ---------- | --------------------------------------- |
| `isOpen`              | `boolean`                                         | -          | モーダルの開閉状態 (必須)               |
| `onClose`             | `() => void`                                      | -          | モーダルを閉じる時のコールバック (必須) |
| `children`            | `React.ReactNode`                                 | -          | モーダルのコンテンツ (必須)             |
| `showCloseButton`     | `boolean`                                         | `true`     | 閉じるボタンを表示するか                |
| `closeOnOverlayClick` | `boolean`                                         | `true`     | オーバーレイクリックで閉じるか          |
| `closeOnEscape`       | `boolean`                                         | `true`     | ESC キーで閉じるか                      |
| `maxWidth`            | `string`                                          | `'500px'`  | モーダルの最大幅                        |
| `maxHeight`           | `string`                                          | `'90vh'`   | モーダルの最大高さ                      |
| `className`           | `string`                                          | `''`       | モーダル本体のカスタムクラス名          |
| `overlayClassName`    | `string`                                          | `''`       | オーバーレイのカスタムクラス名          |
| `animationType`       | `'scale' \| 'slide-up' \| 'slide-down' \| 'fade'` | `'scale'`  | アニメーションタイプ                    |

## 使用例

### 基本的なモーダル

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>確認</h2>
  <p>この操作を実行してもよろしいですか?</p>
  <button onClick={() => setIsOpen(false)}>キャンセル</button>
  <button onClick={handleConfirm}>OK</button>
</Modal>
```

### カスタムサイズ

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  maxWidth="800px"
  maxHeight="80vh"
>
  <h2>大きなコンテンツ</h2>
  <div>...</div>
</Modal>
```

### アニメーションタイプの変更

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  animationType="slide-up"
>
  <h2>下からスライドイン</h2>
  <p>モーダルが下からスライドして表示されます。</p>
</Modal>
```

### 閉じるボタンなし

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showCloseButton={false}
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  <h2>強制的なモーダル</h2>
  <p>このモーダルは明示的なアクションでのみ閉じることができます。</p>
  <button onClick={() => setIsOpen(false)}>閉じる</button>
</Modal>
```

### カスタムスタイル

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  className="custom-modal"
  overlayClassName="custom-overlay"
>
  <h2>カスタムスタイル</h2>
  <p>独自のスタイルを適用できます。</p>
</Modal>
```

## アクセシビリティ

- `role="dialog"`と`aria-modal="true"`を使用
- ESC キーでモーダルを閉じる機能
- 閉じるボタンに`aria-label`を設定
- モーダルが開いている間、背景のスクロールを無効化

## 注意事項

- このコンポーネントは`'use client'`ディレクティブを使用しているため、クライアントコンポーネントです
- モーダルが開いている間、`document.body`の`overflow`スタイルが変更されます
- Portal を使用しているため、`document.body`が存在する環境でのみ動作します
