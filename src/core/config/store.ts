import axios from 'axios'
import { action, computed, observable, runInAction } from 'mobx'
import { Config, ConfigJSON } from './config'

export class ConfigStore {
  @observable data: Config

  constructor(private stage: Stage = 'dev', private domain?: string) {}

  @computed
  get params() {
    return this.domain ? { domain: this.domain } : {}
  }

  @action.bound
  setDomain(domain?: string) {
    if (!domain) return
    this.domain = domain
  }

  @action.bound
  async load() {
    return axios
      .get('configuration', { baseURL: 'url', params: this.params })
      .then((response: { data: ConfigJSON }) => {
        runInAction(() => {
          this.data = response.data
        })
      })
  }
}
