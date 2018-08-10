import { HttpStore } from 'core'
import { Form, InputField } from 'core/form'

export class AccountPasswordChangeStore extends Form {
  url = 'player/change_password'

  constructor(private http: HttpStore) {
    super({
      currentPassword: new InputField({
        value: '',
        required: true,
      }),
      first: new InputField({
        value: '',
        required: true,
      }),
      second: new InputField({
        value: '',
        required: true,
      }),
    })
  }

  serialize() {
    return {
      change_password: {
        currentPassword: this.fields.currentPassword.value,
        newPassword: {
          first: this.fields.first.value,
          second: this.fields.second.value,
        },
      },
    }
  }

  submit() {
    this.updateClientErrors()

    if (!this.isValid()) {
      return Promise.resolve(false)
    }

    return this.http.request
      .post(this.url, this.serialize())
      .then(() => {
        this.updateInitialValues()
        return true
      })
      .catch(error => {
        const resp = error.response
        if (resp) {
          this.updateServerErrors(resp.data)
        }
        return false
      })
  }
}
