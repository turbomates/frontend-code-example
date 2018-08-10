import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Action } from './permissions'
import { UserStore } from './store'

interface Props {
  ifCan: Action
}

interface InjectedProps extends Props {
  user: UserStore
}

@inject('user')
@observer
export class Show extends React.Component<Props, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { ifCan: action, children } = this.props

    if (action && this.injected.user.can(action) && children) {
      return children
    } else {
      return null
    }
  }
}
