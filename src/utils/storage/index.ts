export function get(key: string, defaultValue?: any): any {
  return window.localStorage.getItem(key) || defaultValue
}

export function set(key: string, value: any) {
  window.localStorage.setItem(key, value)
}

export function remove(key: string) {
  window.localStorage.removeItem(key)
}
