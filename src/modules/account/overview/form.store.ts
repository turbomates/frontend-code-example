import { observable } from 'mobx'
import { ConfigStore } from 'core'
import { Form, DateField, IFormFields, InputField, RadioField, SelectField } from 'core/form'
import { IEditProfileJSON } from './overview'

type ResultDict = { [key: string]: string | boolean }

interface IEditFormFields extends IFormFields {
  country: SelectField
  currency: SelectField
  gender: RadioField
  birthday: DateField
}

export class FormStore extends Form {
  @observable fields: IEditFormFields
  readonly url = 'player/profile/edit'

  constructor(private config: ConfigStore, json: IEditProfileJSON) {
    super({
      firstName: new InputField({
        value: json.profile.firstName.data,
        required: false,
      }),
      lastName: new InputField({
        value: json.profile.lastName.data,
        required: false,
      }),
      zip: new InputField({
        value: json.profile.zip.data,
        required: false,
      }),
      country: new SelectField({
        value: json.profile.country.data,
        choices: json.profile.country.choices,
        required: false,
      }),
      city: new InputField({
        value: json.profile.city.data,
        required: false,
      }),
      street: new InputField({
        value: json.profile.street.data,
        required: false,
      }),
      house: new InputField({
        value: json.profile.house.data,
        required: false,
      }),
      phone: new InputField({
        value: json.profile.phone.data,
        required: false,
      }),
      mobilePhone: new InputField({
        value: json.profile.mobilePhone.data,
        required: false,
      }),
      gender: new RadioField({
        value: json.profile.gender.data,
        choices: json.profile.gender.choices,
        required: false,
      }),
      birthday: new DateField({
        value: json.profile.birthday.data,
        required: false,
      }),
      avatar: new InputField({
        value: json.profile.avatar,
        required: false,
      }),
      username: new InputField({
        value: json.profile.username.data,
        required: false,
      }),
    })
  }

  get editableFields() {
    const fields = this.config.data.frontConfiguration['user.fields']
    const fieldNames = Object.keys(fields)

    return fieldNames.filter(name => fields[name].account && fields[name].editable)
  }

  serialize() {
    const profile = this.editableFields.reduce(
      (result, field) => {
        result[field] = this.fields[field].value
        return result
      },
      {} as ResultDict
    )

    return { profile }
  }

  submit() {
    return Promise.resolve(true)
  }
}
