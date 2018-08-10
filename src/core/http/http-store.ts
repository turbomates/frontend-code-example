import axios from 'axios'
import { computed } from 'mobx'
import { ConfigStore } from 'core'

export class HttpStore {
  constructor(private config: ConfigStore) {}

  @computed
  get request() {
    if (!this.config.data.domain) return axios
    const { domain } = this.config.data

    return axios.create({
      baseURL: `//${domain}/api/v1`,
      withCredentials: true,
    })
  }
}
