import 'core-js/es6/promise'
import 'core-js/es7/reflect'
import 'tslib'

import * as React from 'react'
import { useStrict } from 'mobx'
import { Provider, observer } from 'mobx-react'
import { Route, Router, Switch } from 'react-mobx-router'
import { AppStore } from 'core/app.store'
import { Lazy } from 'utils/lazy'
import { AllowedRoute } from 'core/user/AllowedRoute'

import 'utils/polyfill/css-custom-properties'

const Account = () => import('./account'))
const Registration = () => import('./registration')
const Confirmation = () => import('./confirmation')

useStrict(true)

interface Props extends AppStore {
  theme?: string
}

@observer
export class App extends React.Component<Props, {}> {
  render() {
    const { config, history } = this.props
    const { project } = config.data
    const front = config.data.frontConfiguration
    const theme = this.props.theme || front.theme

    return (
      <div className={`theme-${theme} project-${project}`}>
        <Provider {...this.props}>
          <Router history={history}>
            <Switch>
              <Route path="/account">
                <AllowedRoute ifCan="seeAccountPage">
                  <Lazy fetch={Account} />
                </AllowedRoute>
              </Route>
              <Route path="/registration">
                <AllowedRoute ifCan="seeRegistrationPage">
                  <Lazy fetch={Registration} />
                </AllowedRoute>
              </Route>
              <Route path="/player/confirm/:token">
                <Lazy fetch={Confirmation} />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
}