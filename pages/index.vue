<template lang="pug">
.container
  .section
    h1.title ゼロ秒思考タイマー
    ZeroTimer

    hr

    .box.content
      h2 注意事項
      hr
      ul
        li 1分経過するたびに音で知らせてくれます。
        li iOSは以下の場合音が鳴りません。
          ul
            li 消音モード(マナーモード)のとき
            li 画面をロックしたとき
            li ホーム画面に戻ったとき
            li 別のアプリに切り替えたとき

    .box
      h2.title 書籍情報
      hr
      article.media
        figure.media-left
          p.image.is-128x128
            img(src='/images/book.jpg')
        .media-content
          .content
            p
              strong ゼロ秒思考 頭がよくなる世界一シンプルなトレーニング
              | &nbsp;
              small 赤羽雄二（著）
              br
              | A4の紙に1件1ページで書く。ゆっくり時間をかけるのではなく、1ページを1分以内にさっと書く。毎日10ページ書き、フォルダに投げ込んで瞬時に整理する。それだけで、マッキンゼーのプログラムでも十分に教えていない、最も基本的な「考える力」を鍛えられる。深く考えることができるだけでなく、「ゼロ秒思考」と言える究極のレベルに近づける。
            hr
            b-button(type="is-warning", tag="a", href="https://www.amazon.co.jp/dp/447802099X/", icon-left="amazon", target="_blank" rel="noopener noreferrer") Amazon購入ページ
</template>

<script>
import ZeroTimer from '~/components/ZeroTimer'

export default {
  components: { ZeroTimer },
}
</script>
