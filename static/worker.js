// 秒数の精度を決めるもの
const interval = 1.0

let timerID = null

self.onmessage = (e) => {
  if (e.data === 'start') {
    timerID = setInterval(() => {
      postMessage('tick')
    }, interval)
  } else if (e.data === 'stop') {
    clearInterval(timerID)
    timerID = null
  }
}
