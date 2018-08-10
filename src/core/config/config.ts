import { Role, Permission } from 'core/user/permissions'

interface UserField {
  account: boolean
  editable: boolean
  required: boolean
  registration: boolean
}

export interface Config {
  project: string
  domain?: string
  https?: boolean
  documentsVerificationEnabled?: boolean
  indexRoute?: string
  frontConfiguration: {
    theme: string
    'user.fields': { [field: string]: UserField }
    permissions: { [role in Role]?: Permission }
    [field: string]: any
  }
}

export interface ConfigJSON {
  name: string
  domain: string
  https: boolean
  bundles: {
    user: {
      verification: ['email_verification', 'document_verification', string]
    }
    [bundle: string]: any
  }
  frontConfiguration: {
    version: number
    indexRoute: string
    theme: string
    [field: string]: any
  }
  [field: string]: any
}
