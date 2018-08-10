import { action, computed, observable } from 'mobx'
import { Validator, requiredValidator } from './validators'

export interface IFieldProps {
  store: FormField
  name?: string
  placeholder?: string
  label?: any
  visible?: boolean
}

export interface IFormFieldProps {
  value: string | boolean
  required: boolean
  validators?: Validator[]
}

export class FormField {
  @observable initialValue: string | boolean
  @observable value: string | boolean
  @observable required: boolean
  @observable validators: Validator[]
  @observable clientErrors: string[]
  @observable serverErrors: string[]

  @computed
  get isDirty(): boolean {
    return this.initialValue !== this.value
  }

  getClientErrors(): string[] {
    return this.validators.reduce((errors: string[], validate: Validator) => {
      const error = validate(this.value)
      if (error !== null) errors.push(error)
      return errors
    }, [])
  }

  @action('Set server errors')
  setServerErrors(errors: string[]) {
    this.serverErrors = errors
  }

  @computed
  get error() {
    if (this.serverErrors.length) return this.serverErrors[0]
    if (this.clientErrors.length) return this.clientErrors[0]
    return null
  }

  constructor(params: IFormFieldProps) {
    action('FormField constructor', () => {
      this.initialValue = params.value
      this.value = params.value
      this.required = params.required
      this.validators = params.validators || []
      this.clientErrors = []
      this.serverErrors = []

      if (this.required) {
        this.validators.push(requiredValidator)
      }
    })()
  }

  @action('update input field')
  update(value: string | boolean) {
    this.value = value
    this.clientErrors = []
    this.serverErrors = []
  }

  @action('reset input field')
  reset() {
    this.value = this.initialValue
  }

  isValid(): boolean {
    return this.clientErrors.length === 0
  }
}
