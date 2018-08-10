import axios from 'axios'
import { action, computed, extendObservable, observable } from 'mobx'

import { HttpStore } from 'core'
import * as storage from 'utils/storage'
import { parametrize } from 'utils/string'

import { Language } from './language'
import { statics } from './statics'

export class I18nStore {
  @observable public language: Language
  @observable public isStaticsLoaded = false
  @observable private isError = false

  private readonly url = './api/i18n'

  constructor(private http: HttpStore) {}

  /** Dictionary with translations */
  @observable _dict: Dict = {}

  @computed
  get isReady() {
    return this.isStaticsLoaded && !!this.language
  }

  @action
  async load() {
    let locale = storage.get('locale')
    if (!locale) {
      const resp = await this.http.request.get('language')
      locale = resp.data.locale as string
    }
    return this.updateLanguage(locale)
  }

  @action
  public async updateLanguage(locale: string) {
    this.language = new Language(locale)

    const resp = await this.request(this.language.longCode, statics)
    const translations: Dict = resp.data
    this.saveStatics(translations)
    return Promise.resolve()
  }

  /** Translate all what you want */
  public t(key: string): string {
    return this._dict[key] || key
  }

  translateError(error?: ParametrizedError): string {
    if (!error) return ''
    return parametrize(this.t(error.messageTemplate), error.parameters)
  }

  /** Load translations */
  public async translateKeys(keys: string[]) {
    if (this.isError) return

    const filteredKeys = this.filter(keys)
    if (filteredKeys.length) {
      try {
        const translations = await this.fetchTranslations(this.language, filteredKeys)
        this.append(translations)
      } catch (err) {
        this.isError = true
      }
    }
  }

  private request(locale: string, _json: string[]) {
    if (!this.url) throw 'i18nUrl not configured'
    const url = `${this.url}/${locale}`
    return axios.post(url, { _json })
  }

  /** Fetch translations from darkend */
  private fetchTranslations(lang: Language, keys: string[]) {
    return this.request(lang.longCode, keys)
      .then(resp => resp.data as Dict)
      .catch(() => ({}))
  }

  @action
  private saveStatics(translations: Dict) {
    this.append(translations)
    this.isStaticsLoaded = true
  }

  /** Merge exising translations with newest */
  @action
  private append(dictonary: Dict) {
    extendObservable(this._dict, dictonary)
  }

  /** Leaves only not translated keys */
  private filter(keys: string[]): string[] {
    return keys.filter(key => !this.isTranslated(key))
  }

  /** Check if key already translated */
  private isTranslated(key: string): boolean {
    return !!this._dict[key]
  }
}
