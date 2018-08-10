import { ConfigStore } from 'core'

export type Role = 'guest' | 'user'

export type Action =
  | 'seeLoginForm'
  | 'seeRegistrationPage'
  | 'seeBalanceLink'
  | 'seeAccountLink'
  | 'seeAccountPage'
  | 'seeLogoutLink'

export type Permission = {
  defaultRoute: string
  actions: Action[]
}

export class Permissions {
  constructor(private config: ConfigStore) {}

  private get permissions(): { [role in Role]?: Permission } {
    return (this.config.data.frontConfiguration && this.config.data.frontConfiguration.permissions) || {}
  }

  public can(role: Role, action: Action): boolean {
    const permission = this.permissions[role]
    if (!permission) return false

    return permission.actions.indexOf(action) !== -1
  }

  public getDefaultRoleRoute(role: Role) {
    const rolePermissions = this.permissions[role]
    if (rolePermissions && rolePermissions.defaultRoute) {
      return rolePermissions.defaultRoute
    } else {
      return '/'
    }
  }
}
