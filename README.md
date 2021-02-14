# ゼロ秒思考タイマー

ゼロ秒思考に特化したタイマーです。

[https://zerotimer.koeda.me/](https://zerotimer.koeda.me/)

![スクリーンショット](/docs/screenshot.png)

## 開発環境構築

開発にはDockerとDocekr Composeが必要です。

以下のコマンドで開発サーバーを立ち上げると `http://localhost:3000` で確認できるようになります。

```bash
docker-compose up
```

## ビルド手順

```bash
docker-compose run --rm builder ./scripts/build.sh
```

`./dist/` にビルド結果が出力されます。
