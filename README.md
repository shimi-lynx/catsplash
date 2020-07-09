# catsplash
猫画像投稿サイト。Vue.js x Railsで作成した個人制作のポートフォリオです。

[Unsplash](https://unsplash.com/)の素晴らしさに感銘を受けて作成しました。
![トップページ](https://user-images.githubusercontent.com/56603283/87071005-928d5a00-c254-11ea-9efa-8d205813c176.jpg)

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

### インフラ
- AWS
  - VPC
  - RDS(MySQL)
  - S3
  - Route53
  - ECS(EC2で起動)
  - ALB
  - ACM

## システム構成図

## 機能
- 認証機能（ログイン、ログアウト、ユーザ登録）
- 写真投稿機能
  - AWS S3のPre-Signed URLを使用してブラウザから直接アップロード
  - ファイルの種類、ファイルサイズでバリデーション
- 写真一覧表示機能
- いいね機能

## 課題
もろもろの課題はissueにまとめました
- 機能の拡充
  - 画像削除機能
  - ログインユーザがいいね！した画像の一覧表示機能
  - 写真投稿者名をクリックして投稿者の投稿画像の一覧表示機能
  - 直近でいいね！数が多い画像の一覧表示機能
- レスポンシブ対応
- 不具合の解消
etc…
