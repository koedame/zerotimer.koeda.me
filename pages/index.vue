<template lang="pug">
.container
  .section
    h1.title ゼロ秒思考タイマー
    .box
      b-field
        b-radio(v-model='paperAmount', :native-value='5', :disabled="isPlaying") 5分
        b-radio(v-model='paperAmount', :native-value='10', :disabled="isPlaying") 10分
        b-radio(v-model='paperAmount', :native-value='15', :disabled="isPlaying") 15分

      hr
      b-taglist(attached)
        b-tag(type="is-info is-light" size="is-large") {{currentPaper}}枚目
        b-tag(type="is-light" size="is-large") {{displayTime}}秒

      template(v-if="isPlaying")
        b-button(@click="togglePlay", type="is-danger", outlined)
          | ストップ
      template(v-else)
        b-button(@click="togglePlay", type="is-success", outlined)
          | スタート

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
export default {
  data() {
    return {
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      // 再生判定
      isPlaying: false,
      // 現在の秒数
      currentTime: 0,
      // 次にクリックを鳴らすaudioContext時間
      nextTime: 0.0,
      // 並行処理
      timerWorker: new Worker('/worker.js'),
      // ダブルタップによるズーム防止用
      lastTouchEndTime: 0,
      // マスターボリューム
      masterVolume: 0.3,
      scheduleCount: 0,
      // 最大ページ数
      paperAmount: 5,
    }
  },
  computed: {
    maxTime() {
      return 60 * this.paperAmount
    },
    remainingTime() {
      return this.maxTime - Math.floor(this.currentTime)
    },
    displayTime() {
      if (this.remainingTime === this.maxTime) {
        return 60
      } else {
        return this.remainingTime % 60
      }
    },
    currentPaper() {
      if (this.currentTime === 0) {
        return 1
      }
      return Math.ceil(this.currentTime / 60)
    },
    coundDownBeep() {
      // X.5のときは無視
      if (this.currentTime !== Math.floor(this.currentTime)) {
        return false
      }
      if (this.currentTime === 0) {
        return 3
      } else if (this.displayTime === 0) {
        return 1
      } else if (this.displayTime === 1) {
        return 2
      } else if (this.displayTime === 2) {
        return 2
      } else if (this.displayTime === 3) {
        return 2
      } else {
        return false
      }
    },
  },
  mounted() {
    // schedulerを呼び出したいのでselfにしておく
    const self = this
    this.timerWorker.onmessage = (e) => {
      // timeWorkerがtickを受け取ったら音を予約する
      if (e.data === 'tick') {
        self.scheduler()
      }
    }
    // ダブルタプでのズームを防ぐ処理
    document.addEventListener('touchstart', (event) => {
      const now = new Date().getTime()
      if (now - self.lastTouchEndTime < 350) {
        event.preventDefault()
      }
      self.lastTouchEndTime = now
    })
  },
  beforeDestroy() {
    if (this.isPlaying) {
      this.timerWorker.postMessage('stop')
    }
  },
  methods: {
    scheduler() {
      const scheduleAheadTime = 0.05
      while (
        this.nextTime <
        this.audioContext.currentTime + scheduleAheadTime
      ) {
        // いきなり0.5から始まってしまわないように一回目は無視
        if (this.scheduleCount !== 0) {
          this.currentTime += 0.5
        }

        // 音生成用
        const osc = this.audioContext.createOscillator()
        // 音量調整用
        const gainNode = this.audioContext.createGain()
        osc.connect(gainNode)
        gainNode.connect(this.audioContext.destination)
        if (this.currentTime === this.maxTime) {
          // 終了
          osc.frequency.value = 880
          // 音量
          gainNode.gain.value = this.masterVolume

          // 音を予約
          osc.start(this.nextTime)
          osc.stop(this.nextTime + 0.05)

          // 音生成用
          const osc2 = this.audioContext.createOscillator()
          // 音量調整用
          const gainNode2 = this.audioContext.createGain()
          osc2.connect(gainNode2)
          gainNode2.connect(this.audioContext.destination)
          osc2.frequency.value = 880

          osc2.start(this.nextTime + 0.25)
          osc2.stop(this.nextTime + 0.3)

          // 音生成用
          const osc3 = this.audioContext.createOscillator()
          osc3.frequency.value = 880
          // 音量調整用
          const gainNode3 = this.audioContext.createGain()
          osc3.connect(gainNode3)
          gainNode3.connect(this.audioContext.destination)

          osc3.start(this.nextTime + 0.5)
          osc3.stop(this.nextTime + 0.55)
        } else if (this.coundDownBeep === 1) {
          osc.frequency.value = 880
          // 音量
          gainNode.gain.value = this.masterVolume

          // 音を予約
          osc.start(this.nextTime)
          osc.stop(this.nextTime + 1)
        } else if (this.coundDownBeep === 2) {
          osc.frequency.value = 440.0
          // 音量
          gainNode.gain.value = this.masterVolume
          // 音を予約
          osc.start(this.nextTime)
          osc.stop(this.nextTime + 0.05)
        } else if (this.coundDownBeep === 3) {
          osc.frequency.value = 880.0
          // 音量
          gainNode.gain.value = this.masterVolume
          // 音を予約
          osc.start(this.nextTime)
          osc.stop(this.nextTime + 0.05)
        } else {
          // 無音
        }

        this.nextTime += 0.5
        this.scheduleCount++

        if (this.currentTime === this.maxTime) {
          this.togglePlay()
        }
      }
    },
    // 再生/停止の切り替え
    togglePlay() {
      // iOSでは毎回bufferを作り直さないと非アクティブからの復帰時に音が鳴らなくなる
      // 参考: https://qiita.com/zprodev/items/7fcd8335d7e8e613a01f#ios-safari%E3%81%AFbgm%E3%81%AA%E3%81%A9%E3%81%AE%E8%87%AA%E5%8B%95%E5%86%8D%E7%94%9F%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const node = this.audioContext.createBufferSource()
      node.buffer = this.audioContext.createBuffer(1, 1, 22050)
      node.start()
      node.stop()
      this.isPlaying = !this.isPlaying

      // UX的な事情でフォーカスを外す
      setTimeout(() => {
        document.activeElement.blur()
      }, 250)

      if (this.isPlaying) {
        // 初期化
        this.nextTime = this.audioContext.currentTime
        // 開始
        this.timerWorker.postMessage('start')
      } else {
        // 停止
        this.timerWorker.postMessage('stop')
        // 非同期でスケジュールが動くので時間差で止める
        setTimeout(() => {
          this.nextTime = 0
          this.currentTime = 0
          this.scheduleCount = 0
        }, 500)
      }
    },
  },
}
</script>
