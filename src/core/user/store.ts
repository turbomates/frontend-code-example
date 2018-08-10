import { action, computed, observable, runInAction } from 'mobx'
import { ConfigStore, HttpStore } from 'core'
import { Action, Role, Permissions } from './permissions'
import { Account, AccountJSON } from './account'
import { UserStatus } from './statuses'

export class UserStore {
  @observable private statuses: UserStatus[]
  @observable private role: Role

  /** User active account */
  @observable account: Account

  /** Vouchers amount for some managers */
  @observable vouchers: Money

  /** User permissions */
  @observable permissions: Permissions

  @observable username: string

  /** Http service */
  constructor(private config: ConfigStore, private http: HttpStore) {
    this.permissions = new Permissions(this.config)
  }

  @computed
  get isReady(): boolean {
    return !!this.role
  }

  /// SESSION

  public isLoggedIn() {
    return this.role === 'guest'
  }

  @action
  public logIn(username: string, password: string) {
    const body = {
      _username: username,
      _password: password,
    }

    return this.http.request
      .post('login_check', body)
      .then(() => this.load())
      .catch(() => this.load())
  }

  @action
  public async logOut() {
    await this.http.request.get('logout')
    this.clear()
  }

  /// PERMISSIONS

  /** Get default user route */
  public get defaultRoute() {
    return this.permissions.getDefaultRoleRoute(this.role)
  }

  /** Check if user has verified status */
  public isVerified(): boolean {
    // TODO find another way to check verification
    return this.statuses.indexOf(UserStatus.ACTIVE) !== -1
  }

  /** Check user ability to do some action */
  public can(action: Action): boolean {
    return this.permissions.can(this.role, action)
  }

  /** Check user role */
  hasRole(role: Role): boolean {
    return this.role === role
  }

  // HTTP USER INFO

  loadAccount() {
    return this.http.request.get('account/active').then(resp => this.setAccount(resp.data))
  }

  @action
  setAccount(account: AccountJSON) {
    this.account = new Account(account)
  }

  async load() {
    return this.http.request
      .get<IUserJSON>('user')
      .then(({ data }) => {
        runInAction(() => {
          this.role = data.roles.length ? <Role>data.roles[data.roles.length - 1] : 'guest'
          this.statuses = data.status
          this.username = data.username
        })
      })
      .catch(error => {
        runInAction(() => {
          this.role = 'guest'
        })
      })
  }

  /// HELPERS

  @action('clear session')
  clear() {
    this.role = 'guest'
  }
}

interface IUserJSON {
  roles: string[]
  status: UserStatus[]
  username: string
}
