import { observable, computed } from 'mobx'

export class Language {
  @observable code = ''

  constructor(code: string) {
    this.code = code
  }

  /** Code for bts translations */
  @computed
  get longCode(): string {
    if (Language.longCodesMap[this.code]) return Language.longCodesMap[this.code]

    if (this.code.length === 2) return `${this.code}_${this.code.toUpperCase()}`

    return this.code
  }

  @computed
  get iconUrl(): string {
    return `/images/locales/${this.longCode}.png`
  }

  static longCodesMap: Dict = {
    ar: 'ar_AR', // Arabian
    bg: 'bg_BG', // Bulgarian
    de: 'de_DE', // German
    el: 'el_GR', // Greek
    en: 'en_US', // English
    es: 'es_ES', // Spanish
    fa: 'fa_IR', // Farsi
    fr: 'fr_FR', // France
    cr: 'cr_FR', // Creole
    ja: 'ja_JP', // Japanese
    it: 'it_IT', // Italian
    ka: 'ka_GE', // Georgian
    ko: 'ko_KR', // Korean
    ku: 'ku_TR', // Kurdish
    pl: 'pl_PL', // Polish
    pt: 'pt_PT', // Portuguese
    ru: 'ru_RU', // Russian
    sk: 'sk_SK', // Slovak
    sr: 'sr_ME', // Serbian
    th: 'th_TH', // Thai
    tr: 'tr_TR', // Turkish
    vi: 'vi_VN', // Vietnamese
    zh: 'zh_CN', // Chinese
  }

  static getTranslations(): string[] {
    let keys: string[] = []
    for (let key in this.longCodesMap) {
      keys.push('t.' + this.longCodesMap[key])
    }
    return keys
  }
}
