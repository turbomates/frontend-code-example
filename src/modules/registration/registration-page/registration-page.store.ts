import { action, observable } from 'mobx'
import { ConfigStore, HttpStore, MobxHistory, NotifierStore } from 'core'

import { IRegistrationFormJSON, RegistrationForm } from './form'

export class RegistrationStore {
  @observable form: RegistrationForm

  constructor(
    private config: ConfigStore,
    private http: HttpStore,
    private history: MobxHistory,
    private notifier: NotifierStore
  ) {}

  async load() {
    const resp = await this.http.request.get('player/registration')
    this.initForm(resp.data.registration)
  }

  @action
  initForm(json: IRegistrationFormJSON) {
    this.form = new RegistrationForm(json, this.config, this.http.request, this.notifier)
  }

  async submit(event: any) {
    event.preventDefault()

    const isSuccess = await this.form.submit()
    if (!isSuccess) return

    // TODO get confirmation from config
    // const url = this.withConfirmation ? '/registration/check-email' : '/registration/success'
    const url = '/registration/success'

    this.history.push(url)
  }
}
