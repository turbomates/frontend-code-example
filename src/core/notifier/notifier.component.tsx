import * as React from 'react'
import { NotifierStore } from 'core'
import { observer, inject } from 'mobx-react'

interface InjectedProps {
  notifier: NotifierStore
}

@inject('notifier')
@observer
export class NotifierComponent extends React.Component<{}, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { notifier } = this.injected

    if (!notifier.notifications.length) return null
    if (!notifier.showLog) return <div className="notifier" />

    return (
      <div className="notifier">
        {notifier.activeNotifications.map((notification, index) => (
          <div
            key={index}
            className={`notifier__message notifier__message_${notification.status}`}
            onMouseEnter={notification.focus}
            onMouseLeave={notification.unfocus}
          >
            {notification.source && <span>{notification.source}: </span>}
            {notification.text}
          </div>
        ))}
      </div>
    )
  }
}
