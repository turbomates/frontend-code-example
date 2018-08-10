import * as React from 'react'
import { Switch, Route } from 'react-mobx-router'

import { RegistrationPage } from './registration-page'
import { CheckEmailPage } from './check-email-page'
import { SuccessPage } from './success-page'

export const RegistrationModule = () => (
  <Switch>
    <Route path="/registration" component={RegistrationPage} exact />
    <Route path="/registration/success" component={SuccessPage} />
    <Route path="/registration/check-email" component={CheckEmailPage} />
  </Switch>
)
