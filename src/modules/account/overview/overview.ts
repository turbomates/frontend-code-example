import { InputFieldJSON, SelectFieldJSON } from 'core/form'

export interface IProfileJSON {
  username: string
  code: string
  email: string
  profile: {
    avatar: any
    birthday: string
    firstName: string
    lastName: string
    gender: string
    location: {
      city: string
      country: string
      house: string
      mobilePhone: string
      phone: string
      state: string
      street: string
      zip: string
    }
  }
  settings: {
    currency: string
    language: string
    oddsFormat: string
  }
}

export interface IEditProfileJSON {
  profile: {
    avatar: any
    birthday: InputFieldJSON
    city: InputFieldJSON
    country: SelectFieldJSON
    currency: SelectFieldJSON
    firstName: InputFieldJSON
    gender: SelectFieldJSON
    house: InputFieldJSON
    language: SelectFieldJSON
    lastName: InputFieldJSON
    mobilePhone: InputFieldJSON
    oddsFormat: SelectFieldJSON
    phone: InputFieldJSON
    sessionDuration: InputFieldJSON
    state: InputFieldJSON
    street: InputFieldJSON
    timezone: SelectFieldJSON
    username: InputFieldJSON
    zip: InputFieldJSON
  }
}
