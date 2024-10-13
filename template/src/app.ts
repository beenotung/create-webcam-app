import { attachMain, canvas, context, video } from './ui'

attachMain(main)

async function main() {
  let facingMode = 'user'
  // let facingMode = 'environment'

  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode,
    },
    audio: false,
  })

  facingMode =
    (stream.getVideoTracks()[0].getConstraints().facingMode as string) ||
    facingMode

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
