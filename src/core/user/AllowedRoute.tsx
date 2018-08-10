import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-mobx-router'
import { Action } from './permissions'
import { UserStore } from './store'

interface Props {
  ifCan: Action
  user?: UserStore
}

@inject('user')
@observer
export class AllowedRoute extends React.Component<Props, {}> {
  render() {
    const { ifCan: action, children } = this.props
    const user = this.props.user!

    if (action && user.can(action) && children) {
      return children
    } else {
      return <Redirect from="/" to={user.defaultRoute} />
    }
  }
}
