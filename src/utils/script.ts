export function newScript(src: string) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', e => reject(e))
    document.body.appendChild(script)
  })
}
