# CatSplash
猫画像投稿サイト。Vue.js x Railsで作成した個人制作のポートフォリオです。

[Unsplash](https://unsplash.com/)の素晴らしさに感銘を受けて作成しました。

ユーザ登録せずに各機能をお試し頂ける簡単ログイン機能がありますので、画面右上の「Log in / Sign up」をクリック→「簡単Log in」ボタンより是非お試し下さい。
![トップページ](https://user-images.githubusercontent.com/56603283/87071005-928d5a00-c254-11ea-9efa-8d205813c176.jpg)

---
![いいね1](https://user-images.githubusercontent.com/56603283/87076075-34fd0b80-c25c-11ea-91fd-a80dbca243cc.gif)

## URL
https://shimi-lynx.github.io/catsplash/


## 使用技術
### バックエンド
- Ruby：2.7.1
- Ruby on Rails：6.0.3.1
- mysql 8.0.19

### フロントエンド
- Vue.js 2.6.11
  - Vuex
  - Vue Router
- CSS フレームワーク
  - Buefy

### インフラ
- AWS
  - VPC
  - RDS(MySQL)
  - S3
  - CloudFront
  - Route53
  - ECS(EC2で起動)
  - ALB
  - ACM

## システム構成図
![aws構成図 (1)](https://user-images.githubusercontent.com/56603283/87130761-5c8cbc00-c2ce-11ea-8beb-c72b1a66574e.jpg)

## 機能
- 認証機能（ログイン、ログアウト、ユーザ登録）
  - devise_auth_token gemを使用しトークンベースの認証
- 簡単ログイン機能
  - ユーザ登録不要でログインでき、ログイン後の機能をすぐに試せるもの
- 写真投稿機能
  - AWS S3のPre-Signed URLを使用してブラウザから直接アップロード
  - ファイルの種類、ファイルサイズでバリデーション
  - 投稿する写真のプレビュー機能
- 写真一覧表示機能
- いいね機能

## 課題
もろもろの課題は[issue](https://github.com/shimi-lynx/catsplash/issues)にまとめました
- 機能の拡充
  - 画像削除機能
  - ログインユーザがいいね！した画像の一覧表示機能
  - 写真投稿者名をクリックして投稿者の投稿画像の一覧表示機能
  - 直近でいいね！数が多い画像の一覧表示機能
- レスポンシブ対応
- 不具合の解消
etc…
