import { MobxHistory } from 'mobx-history'
import createBrowserHistory from 'mobx-history/createBrowserHistory'

import { ConfigStore } from './config'
import { HttpStore } from './http'
import { I18nStore } from './i18n'
import { UserStore } from './user'
import { NotifierStore } from './notifier'

import { AccountOverviewStore } from 'modules/account/overview'
import { AccountPasswordChangeStore } from 'modules/account/password-change'
import { AccountVerificationStore } from 'modules/account/verification'
import { RegistrationStore } from 'modules/registration/registration-page/registration-page.store'
import { RegistrationSuccessStore } from 'modules/registration/success-page/success-page.store'

export interface AppStore {
  config: ConfigStore
  history: MobxHistory
  http: HttpStore
  i18n: I18nStore
  notifier: NotifierStore
  user: UserStore
  accountOverview: AccountOverviewStore
  accountVerification: AccountVerificationStore
  accountPasswordChange: AccountPasswordChangeStore
  registration: RegistrationStore
  registrationSuccess: RegistrationSuccessStore
}

export function createStore(config: ConfigStore): AppStore {
  const history = createBrowserHistory()
  const http = new HttpStore(config)
  const i18n = new I18nStore(http)
  const notifier = new NotifierStore()
  const user = new UserStore(config, http)
  const accountOverview = new AccountOverviewStore(config, http, notifier, i18n)
  const accountVerification = new AccountVerificationStore(config, http)
  const accountPasswordChange = new AccountPasswordChangeStore(http)
  const registration = new RegistrationStore(config, http, history, notifier)
  const registrationSuccess = new RegistrationSuccessStore(user, history)

  return {
    config,
    history,
    http,
    i18n,
    notifier,
    user,
    accountOverview,
    accountVerification,
    accountPasswordChange,
    registration,
    registrationSuccess,
  }
}
