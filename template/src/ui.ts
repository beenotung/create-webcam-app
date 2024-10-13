export let video = querySelector<HTMLVideoElement>('#video')
export let canvas = querySelector<HTMLCanvasElement>('#canvas')
export let message = querySelector<HTMLElement>('#message')
export let context = canvas.getContext('2d')!

if (!context) {
  throw new Error('2D canvas not supported')
}

export function querySelector<E extends HTMLElement>(
  selector: string,
  parent: ParentNode = document.body,
): E {
  let e = parent.querySelector<E>(selector)
  if (!e) {
    throw new Error(`selector not matched: ${selector}`)
  }
  return e
}

export function attachMain(main: () => void) {
  message.innerText = 'touch the screen to start'
  window.addEventListener('mousemove', main, { once: true })
  window.addEventListener('click', main, { once: true })
}

/* fallback error display */
window.onerror = (event, source, lineno, colno, error) => {
  console.error(error)
  showJSONResult({
    source,
    lineno,
    colno,
    error: String(error),
  })
}
window.onunhandledrejection = event => {
  event.promise.catch(error => {
    console.error(error)
    showJSONResult({
      error: String(error),
      reason: event.reason,
    })
  })
}
function showJSONResult(data: object) {
  message.innerText = JSON.stringify(data, null, 2)
  message.style.whiteSpace = 'pre-wrap'
}

message.innerText = 'loaded js'
