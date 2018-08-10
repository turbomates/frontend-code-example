import { observable } from 'mobx'
import { UserStore } from 'core'
import { Form, IFormFields, InputField } from 'core/form'

interface ILoginFormField extends IFormFields {
  username: InputField
  password: InputField
}

export class LoginForm extends Form {
  @observable fields: ILoginFormField
  url = ''

  constructor(private user: UserStore) {
    super({
      username: new InputField({ value: '', required: true }),
      password: new InputField({ value: '', required: true }),
    })
  }

  serialize() {
    return {}
  }

  submit() {
    this.updateClientErrors()

    if (!this.isValid()) {
      return Promise.resolve(true)
    }

    return this.user
      .logIn(this.fields.username.value as string, this.fields.password.value as string)
      .then(() => true)
  }
}
