import { attachMain, canvas, context, message, video } from './ui'

attachMain(main)

async function main() {
  message.innerText = 'requesting webcam'
  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user',
      // facingMode: 'environment',
    },
    audio: false,
  })
  message.innerText = 'ready'

  let facingMode = stream.getVideoTracks()[0].getConstraints().facingMode

  if (facingMode == 'user') {
    canvas.style.transform = 'scaleX(-1)'
    video.style.transform = 'scaleX(-1)'
  } else {
    canvas.style.transform = 'scaleX(1)'
    video.style.transform = 'scaleX(1)'
  }

  video.srcObject = stream
  video.play()
  video.onloadeddata = () => {
    requestAnimationFrame(loop)
  }
}

function loop() {
  let rect = video.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  context.drawImage(video, 0, 0)
  requestAnimationFrame(loop)
}
