import { observable } from 'mobx'
import { AxiosError } from 'axios'

import { ConfigStore, HttpStore, NotifierStore } from 'core'
import {
  Form,
  IFormFields,
  CheckboxFieldJSON,
  InputFieldJSON,
  SelectFieldJSON,
  FileFieldJSON,
  CheckboxField,
  DateField,
  InputField,
  RadioField,
  SelectField,
  emailValidator,
} from 'core/form'

export interface IRegistrationFormJSON {
  acceptTerms: CheckboxFieldJSON
  adult: CheckboxFieldJSON
  affiliateCode: InputFieldJSON
  avatar: FileFieldJSON
  birthday: InputFieldJSON
  city: InputFieldJSON
  country: SelectFieldJSON
  currency: SelectFieldJSON
  email: InputFieldJSON
  firstName: InputFieldJSON
  gender: SelectFieldJSON
  house: InputFieldJSON
  language: SelectFieldJSON
  lastName: InputFieldJSON
  mobilePhone: InputFieldJSON
  oddsFormat: SelectFieldJSON
  phone: InputFieldJSON
  plainPassword: {
    first: InputFieldJSON
    second: InputFieldJSON
  }
  sessionDuration: InputFieldJSON
  state: InputFieldJSON
  street: InputFieldJSON
  timezone: SelectFieldJSON
  username: InputFieldJSON
  zip: InputFieldJSON
}

interface IRegistrationFormField extends IFormFields {
  acceptTerms: CheckboxField
  birthday: DateField
  city: InputField
  country: SelectField
  currency: SelectField
  email: InputField
  firstName: InputField
  gender: RadioField
  lastName: InputField
  phone: InputField
  password: InputField
  street: InputField
  username: InputField
  zip: InputField
}

const isRequired = (config: ConfigStore, field: string) => {
  const fields = (config.data.frontConfiguration && config.data.frontConfiguration['user.fields']) || {}

  if (!fields[field] || !fields[field].registration || !fields[field].required) return false

  return true
}

export class RegistrationForm extends Form {
  url = 'player/registration'

  @observable fields: IRegistrationFormField

  constructor(
    data: IRegistrationFormJSON,
    config: ConfigStore,
    private http: HttpStore,
    private notifier: NotifierStore
  ) {
    super({
      acceptTerms: new CheckboxField({
        value: data.acceptTerms.data,
        required: isRequired(config, 'acceptTerms'),
      }),
      birthday: new DateField({
        value: data.birthday.data,
        required: isRequired(config, 'birthday'),
      }),
      city: new InputField({
        value: data.city.data,
        required: isRequired(config, 'city'),
      }),
      country: new SelectField({
        value: data.country.data,
        choices: data.country.choices,
        required: isRequired(config, 'country'),
      }),
      currency: new SelectField({
        value: data.currency.data,
        choices: data.currency.choices,
        required: isRequired(config, 'currency'),
      }),
      email: new InputField({
        value: data.email.data,
        required: isRequired(config, 'email'),
        validators: [emailValidator],
      }),
      firstName: new InputField({
        value: data.firstName.data,
        required: isRequired(config, 'firstName'),
      }),
      gender: new RadioField({
        value: data.gender.data,
        choices: data.gender.choices,
        required: isRequired(config, 'gender'),
      }),
      lastName: new InputField({
        value: data.lastName.data,
        required: isRequired(config, 'lastName'),
      }),
      phone: new InputField({
        value: data.phone.data,
        required: isRequired(config, 'phone'),
      }),
      password: new InputField({
        value: data.plainPassword.first.data,
        required: isRequired(config, 'password'),
      }),
      street: new InputField({
        value: data.street.data,
        required: isRequired(config, 'street'),
      }),
      username: new InputField({
        value: data.username.data,
        required: isRequired(config, 'username'),
      }),
      zip: new InputField({
        value: data.zip.data,
        required: isRequired(config, 'zip'),
      }),
    })
  }

  serialize(): any {
    const form = this.fields

    return {
      registration: {
        username: form.username.value,
        plainPassword: {
          first: form.password.value,
          second: form.password.value,
        },
        gender: form.gender.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthday: form.birthday.value,
        currency: form.currency.value,
        country: form.country.value,
        city: form.city.value,
        zip: form.zip.value,
        street: form.street.value,
        email: form.email.value,
        phone: form.phone.value,
        acceptTerms: form.acceptTerms.value,
      },
    }
  }

  submit() {
    this.updateClientErrors()

    if (!this.isValid()) {
      return Promise.resolve(false)
    }

    const body = this.serialize()

    // Affiliate system tracking
    if ('PostAffTracker' in window) {
      const { PostAffTracker } = window as any
      const { email } = body.registration

      let action = PostAffTracker.createAction('registration')
      action.setData1(email)
      PostAffTracker.register()

      body.registration.code = email
    }

    return this.http.request
      .post(this.url, body)
      .then(() => {
        this.updateInitialValues()
        this.notifier.success('registration success', 'registration')
        return true
      })
      .catch((error: AxiosError) => {
        this.notifier.error('registration error', 'registration')
        const resp = error.response
        if (resp) {
          this.updateServerErrors(resp.data)
        }
        return false
      })
  }
}
