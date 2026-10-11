# サギのカギ

特殊詐欺の手口を体験しながら学べる、ブラウザで遊べるシングルページのミニゲームです。
東京都「都知事杯オープンデータ・ハッカソン2026」出展作品。

## 概要

家族（男性・青年・おばあちゃん）のもとに届くニセの電話やメッセージを見抜き、
正しいキーワードをタップして詐欺を撃退するゲームです。

- React + Vite によるシングルページアプリ
- 画像アセットは Kenney (CC0) の "Tiny Dungeon" / "Pixel Platformer" パックを加工して Base64 埋め込み
- GA4 / GTM による操作イベントのトラッキングを実装済み

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## デプロイ

`main` ブランチへの push をトリガーに GitHub Actions (`.github/workflows/deploy.yml`) が
自動でビルドし、GitHub Pages に公開します。

GitHub Pages はリポジトリ名のサブパス (`/sagi-no-kagi/`) で配信されるため、
`vite.config.js` の `base` をビルド時のみ `/sagi-no-kagi/` に設定しています。
リポジトリ名を変更する場合は、この値も合わせて変更してください。

## ライセンス表記

本プロジェクトで使用している画像アセットは Kenney (www.kenney.nl) 制作の
CC0 (Creative Commons Zero) 素材を加工したものです。
