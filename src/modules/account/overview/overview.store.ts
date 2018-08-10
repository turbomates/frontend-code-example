import { action, observable } from 'mobx'
import { ConfigStore, HttpStore, NotifierStore, I18nStore } from 'core'

import { IProfileJSON, IEditProfileJSON } from './overview'
import { FormStore } from './form.store'

type Mode = 'view' | 'edit'

export class AccountOverviewStore {
  @observable mode: Mode = 'view'
  @observable user: IProfileJSON
  @observable form: FormStore

  constructor(
    private config: ConfigStore,
    private http: HttpStore,
    private notifier: NotifierStore,
    private i18n: I18nStore
  ) {}

  load() {
    this.loadAccountData()
    this.loadEditAccountData()
  }

  @action
  toggleMode() {
    this.mode = this.mode === 'edit' ? 'view' : 'edit'
    if (this.mode === 'edit') {
      this.loadEditAccountData()
    }
  }

  @action
  saveProfile(profile: IProfileJSON) {
    this.user = profile
  }

  @action
  saveEditProfile(profile: IEditProfileJSON) {
    this.form = new FormStore(this.config, profile)
  }

  loadAccountData(): Promise<void> {
    return this.http.request.get<IProfileJSON>('user').then(resp => this.saveProfile(resp.data))
  }

  loadEditAccountData(): Promise<void> {
    return this.http.request
      .get<IEditProfileJSON>('player/profile/edit')
      .then(resp => this.saveEditProfile(resp.data))
  }

  // TODO don't load data if success
  async sendEditedProfile() {
    this.form.updateClientErrors()

    if (!this.form.isValid()) {
      this.notifier.error(this.i18n.t('Some fields are invalid. Check data'), this.i18n.t('account'))
      return
    }

    try {
      await this.http.request.patch(this.form.url, this.form.serialize())
      await this.loadAccountData()
      this.toggleMode()
    } catch (error) {
      const resp = error.response
      if (resp) {
        this.form.updateServerErrors(resp.data)
      }
    }
  }
}
