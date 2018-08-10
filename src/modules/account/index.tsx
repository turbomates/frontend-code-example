import * as React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'react-mobx-router'
import { ConfigStore } from 'core'
import { Lazy } from 'utils/lazy'
import { AccountNavigationComponent } from './navigation.component'

interface Props {
  config?: ConfigStore
}

import './account.css'

@observer
export default class Account extends React.Component<Props, {}> {
  render() {
    return (
      <div className="container">
        <div className="main-content">
          <aside id="sidebar">
            <AccountNavigationComponent />
          </aside>
          <div id="content">
            <Switch>
              <Route exact path="/account">
                <Lazy fetch={() => import('./overview')} />
              </Route>
              <Route exact path="/account/verification">
                <Lazy fetch={() => import('./verification')} />
              </Route>
              <Route exact path="/account/change_password">
                <Lazy fetch={() => import('./password-change')} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
