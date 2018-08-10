import { observable } from 'mobx'
import { UserStore, MobxHistory } from 'core'

import { LoginForm } from './form'

export class RegistrationSuccessStore {
  @observable form: LoginForm

  constructor(private user: UserStore, private history: MobxHistory) {
    this.form = new LoginForm(this.user)
  }

  async submit() {
    await this.form.submit()

    if (this.user.isLoggedIn) {
      this.history!.push('/account/deposit')
    }
  }
}
