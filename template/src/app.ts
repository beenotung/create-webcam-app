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

  /* TODO place the logics here */
  let image = context.getImageData(0, 0, canvas.width, canvas.height)
  for (let offset = 0; offset < image.data.length; offset += 4) {
    let sum = 0
    for (let i = 0; i < 3; i++) {
      image.data[offset + i] *= 1.5
      sum += image.data[offset + i]
    }
    let average = (sum /= 3)
    for (let i = 0; i < 3; i++) {
      let diff = image.data[offset + i] - average
      image.data[offset + i] += diff * 0.2
    }
  }
  context.putImageData(image, 0, 0)

  requestAnimationFrame(loop)
}
