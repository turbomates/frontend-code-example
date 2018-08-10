import { action, computed, observable } from 'mobx'

const DEFAULT_PER_PAGE = 20

export interface IPageableJSON {
  leftItems: number
  page: number
  pages: number
  perPage: number
  totalItems: number
}

export class Paging {
  @observable page: number
  @observable perPage: number

  @observable leftItems: number
  @observable pages: number
  @observable totalItems: number

  @observable isLoading: boolean
  @observable isLoaded: boolean

  constructor(perPage?: number) {
    this.leftItems = 0
    this.page = 1
    this.pages = 0
    this.perPage = perPage || DEFAULT_PER_PAGE
    this.totalItems = 0

    this.isLoading = false
    this.isLoaded = false
  }

  @action
  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  @action
  setLoaded(isLoaded: boolean) {
    this.isLoaded = isLoaded
  }

  @action
  update(data: IPageableJSON) {
    this.leftItems = data.leftItems
    this.page = data.page
    this.pages = data.pages
    this.perPage = data.perPage
    this.totalItems = data.totalItems

    this.isLoaded = data.page === data.pages
  }

  @computed
  get hasNext() {
    return this.page < this.pages
  }
}
