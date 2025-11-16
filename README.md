# サンプルカフェ React デモ

ホスピタリティ業界向け CMS のデモを、React だけで完結するシングルページアプリケーションとして再構築しました。トップ/アクセス/予約/ギャラリー/ストーリー/ハイライトの各ページだけでなく、管理画面 (CMS) もフロントエンドのみで動作するように移植しています。

## 特長

- **純粋な React SPA**: すべてのページやアニメーションを React + Vite で配信。Python/Flask などのバックエンドは不要です。
- **管理画面も React 化**: `/admin` 以下にログイン、ダッシュボード、ページ編集、ギャラリー/ハイライト/お知らせ管理を実装。入力内容はブラウザの `localStorage` に保存され、即座にサイト側へ反映されます。
- **リッチな演出**: ページローダー、スクロールアニメーション、カウンター演出など、従来の UI を完全移植しました。
- **アセット内蔵**: 旧 Flask 版が配信していた SVG やスタイルシートを React プロジェクトに同梱し、ビルド成果物だけで完結します。

## セットアップ

Node.js (18 以上) を用意し、以下の手順で開発できます。

```bash
npm run install  # = cd frontend && npm install
npm run dev      # = cd frontend && npm run dev
```

> 既存の手順で `cd frontend` して各コマンドを実行しても構いませんが、
> ルートディレクトリの `package.json` にラッパースクリプトを用意したため
> `npm run build` などをどこからでも実行できるようになりました。

- 開発サーバー: <http://localhost:5173>
- 本番ビルド: `npm run build`
- ビルド結果のローカル確認: `npm run preview`

## デプロイ（お名前.com 共用サーバー例）

お名前.com の共用サーバーのように Apache で静的ファイルを配信する場合は、以下の手順で SPA として動作させられます。

1. `npm run build` を実行し、`frontend/dist` に生成されるファイル一式をダウンロードします。
2. 生成物をサーバーのドキュメントルートにアップロードします。`index.html` と `assets/`、それに含まれるファイルをすべて配置してください。
3. ルート直下に同梱の `.htaccess`（`frontend/public/.htaccess`）を置きます。Vite のビルド時に `dist/.htaccess` としてコピーされるため、そのままアップロードすれば OK です。

`.htaccess` では存在しないパスをすべて `index.html` にフォールバックするよう `RewriteRule` を定義しているため、`/admin/login` や `/gallery` などに直接アクセスしても React Router が正しくレンダリングできます。

> サブディレクトリ配信が必要な場合は `frontend/vite.config.js` の `base` を `/subdir/` のように変更してから再ビルドしてください。

## 管理画面の使い方

1. <http://localhost:5173/admin/login> にアクセスし、初期 ID `admin` / パスワード `admin1234` でログインします。
2. ダッシュボードから各ページの編集、ギャラリー画像のアップロード、ハイライト/お知らせの追加・削除が可能です。
3. すべての変更は `localStorage` に保存されるため、ブラウザを再読み込みしても反映された状態が維持されます。リセットしたい場合はブラウザのサイトデータをクリアしてください。

## カスタマイズ

- 初期文言・紹介カード・ギャラリー画像などは `frontend/src/data/cafeData.js` で定義されています。ここを書き換えると初期状態が変わります。
- `frontend/src/context/CmsDataContext.jsx` で CMS の永続化・ログインロジックを制御しています。バックエンド API と接続したい場合はここを差し替えるとスムーズです。
- スタイルは `frontend/src/styles/app.css` (サイト) と `frontend/src/styles/admin.css` (管理画面) にまとまっています。CSS Variables で色や余白をまとめて変更できます。
- ページコンポーネントは `frontend/src/pages/` 配下、管理画面ページは `frontend/src/pages/admin/` にあります。React Router がルーティングを担当しています。

## プロジェクト構成

```
frontend/
├── index.html           # ルート HTML（フォント・アイコンの読み込み）
├── package.json
├── src/
│   ├── App.jsx          # サイト/管理画面のルーティング
│   ├── assets/images/   # すべての SVG アセット
│   ├── components/      # ヘッダー/フッター/ローダー/管理レイアウト
│   ├── context/         # CMS ストア (localStorage 永続化)
│   ├── data/cafeData.js # 公式サイトの初期コンテンツ
│   ├── hooks/           # データ取得やスクロール演出のカスタムフック
│   ├── lib/             # ファイルユーティリティなど
│   ├── pages/           # サイト/管理画面の各ページ
│   └── styles/          # サイト & 管理画面のスタイル
└── vite.config.js       # Vite 設定
```

## ライセンス

デモ用途にご利用ください。ブランド名やビジュアルは任意で置き換えていただけます。
