import { action, observable } from 'mobx'
import { FormField } from './field'

export interface IFormFields {
  [field: string]: FormField
}

interface ServerError {
  message: string
}

interface ServerErrors {
  [field: string]: ServerError[]
}

export abstract class Form {
  @observable apiUrl: string
  @observable fields: IFormFields

  abstract url: string

  constructor(fields: IFormFields) {
    this.fields = fields
  }

  abstract serialize(): Object
  abstract submit(): Promise<boolean>

  isValid(): boolean {
    for (let fieldName in this.fields) {
      if (!this.fields[fieldName].isValid()) {
        return false
      }
    }
    return true
  }

  @action('Update client errors')
  updateClientErrors() {
    for (let fieldName in this.fields) {
      this.fields[fieldName].clientErrors = this.fields[fieldName].getClientErrors()
    }
  }

  @action('Update server errors')
  updateServerErrors(errors: ServerErrors) {
    for (let fieldName in errors) {
      this.fields[fieldName].serverErrors = errors[fieldName].map(e => e.message)
    }
  }

  @action('Update initial value after submit')
  updateInitialValues() {
    for (let fieldName in this.fields) {
      this.fields[fieldName].initialValue = this.fields[fieldName].value
    }
  }
}
