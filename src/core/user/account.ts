import { observable } from 'mobx'

export interface AccountJSON {
  id: number
  status: string
  type: string
  money: {
    amount: number
    currency: string
  }
}

export class Account {
  @observable id: number
  @observable money: Money

  constructor(data: AccountJSON) {
    this.id = data.id
    this.money = data.money
  }
}
