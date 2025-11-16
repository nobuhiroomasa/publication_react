# サンプルカフェ React デモ

ホスピタリティ業界向け CMS のデモを、React だけで完結するシングルページアプリケーションとして再構築しました。トップ/アクセス/予約/ギャラリー/ストーリー/ハイライトの各ページをシームレスに遷移でき、もともとのデザインや演出をそのまま引き継いでいます。

## 特長

- **純粋な React SPA**: すべてのページやアニメーションを React + Vite で配信。Python/Flask などのバックエンドは不要です。
- **リッチな演出**: ページローダー、スクロールアニメーション、カウンター演出など、従来の UI を完全移植しました。
- **静的データ管理**: `src/data/cafeData.js` にサイト全体のコンテンツを集約。JSON ライクなオブジェクトを書き換えるだけでテキストや画像を更新できます。
- **アセット内蔵**: これまで Flask が配信していた SVG やスタイルシートを React プロジェクトに同梱し、ビルド成果物だけで完結します。

## セットアップ

Node.js (18 以上) を用意し、以下の手順で開発できます。

```bash
cd frontend
npm install
npm run dev
```

- 開発サーバー: <http://localhost:5173>
- 本番ビルド: `npm run build`
- ビルド結果のローカル確認: `npm run preview`

## カスタマイズ

- 文言・紹介カード・ギャラリー画像などは `frontend/src/data/cafeData.js` を編集してください。
- スタイルは `frontend/src/styles/app.css` にまとまっています。CSS Variables で色や余白をまとめて変更できます。
- ページコンポーネントは `frontend/src/pages/` 配下にあり、React Router でルーティングしています。

## プロジェクト構成

```
frontend/
├── index.html           # ルート HTML（フォント・アイコンの読み込み）
├── package.json
├── src/
│   ├── App.jsx          # ルーティングとグローバルレイアウト
│   ├── assets/images/   # すべての SVG アセット
│   ├── components/      # ヘッダー/フッター/ローダーなどの共通 UI
│   ├── data/cafeData.js # 公式サイトの静的コンテンツ
│   ├── hooks/           # データ取得やスクロール演出のカスタムフック
│   ├── pages/           # 各ページのセクション
│   └── styles/app.css   # 旧 Flask 版のスタイルを完全移植
└── vite.config.js       # Vite 設定
```

## ライセンス

デモ用途にご利用ください。ブランド名やビジュアルは任意で置き換えていただけます。
