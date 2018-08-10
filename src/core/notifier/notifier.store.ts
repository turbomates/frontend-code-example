import { action, computed, observable, IObservableArray } from 'mobx'

const NOTIFICATIONS_SIZE = 10
const NOTIFICATION_TIMEOUT = 5000
const NOTIFICATION_LEAVE_TIMEOUT = 2000

type Status = 'success' | 'error'

class Notification {
  status: Status
  text: string
  source?: string
  time: Date
  timeout: any
  @observable isActive: boolean

  constructor(status: Status, text: string, source?: string) {
    this.status = status
    this.text = text
    this.source = source
    this.isActive = true
    this.time = new Date()

    this.timeout = setTimeout(this.disactivate, NOTIFICATION_TIMEOUT)
  }

  @action.bound
  private disactivate() {
    this.isActive = false
  }

  @action.bound
  focus() {
    if (this.timeout) clearTimeout(this.timeout)
  }

  @action.bound
  unfocus() {
    this.timeout = setTimeout(this.disactivate, NOTIFICATION_LEAVE_TIMEOUT)
  }
}

export class NotifierStore {
  notifications: IObservableArray<Notification> = observable([])
  // possibility to show messages log
  @observable showLog: boolean = false

  @computed
  get activeNotifications() {
    return this.notifications.filter(n => n.isActive)
  }

  public success(text: string, source?: string) {
    this.addNotification('success', text, source)
  }

  public error(text: string, source?: string) {
    this.addNotification('error', text, source)
  }

  @action.bound
  private addNotification(status: Status, text: string, source?: string) {
    const notification = new Notification(status, text, source)
    this.notifications.push(notification)
    if (this.notifications.length > NOTIFICATIONS_SIZE) {
      this.notifications.remove(this.notifications[0])
    }
  }

  @action.bound
  public toggleLog() {
    this.showLog = !this.showLog
  }
}

export const notifier = new NotifierStore()

// Testing in console
if (process.env.NODE_ENV === 'development') {
  Object.assign(window, { notifier })
}
