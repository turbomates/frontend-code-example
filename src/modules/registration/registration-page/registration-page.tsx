import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-mobx-router'
import { ConfigStore } from 'core'
import { Checkbox, Datepicker, Input, Radio, Select } from 'core/form'

import { RegistrationStore } from './registration-page.store'

import './registration-page.css'

interface FormFieldProps {
  name?: string
  config?: ConfigStore
}

@inject('config')
@observer
class FormFieldComponent extends React.Component<FormFieldProps, {}> {
  render() {
    const { name = '', children, config } = this.props
    const fieldsMap =
      (config!.data.frontConfiguration && config!.data.frontConfiguration['user.fields']) || {}

    if (!fieldsMap[name] || !fieldsMap[name].registration) return null

    return children as JSX.Element
  }
}

interface Props {
  registration?: RegistrationStore
}

@inject('registration')
@observer
export class RegistrationPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  async componentDidMount() {
    this.props.registration!.load()
  }

  onSubmit(event: any) {
    this.props.registration!.submit(event)
  }

  render() {
    const { form } = this.props.registration!
    if (!form || !form.fields) return null
    const { fields } = form

    return (
      <div className="container">
        <form className="content__block registration-page" onSubmit={this.onSubmit.bind(this)}>
          <div className="content__header registration-page__header">Registration</div>
          <div className="registration-page__wrapper">
            <div className="registration-page__column">
              <FormFieldComponent name="username">
                <Input label="Username" store={fields.username} />
              </FormFieldComponent>
              <FormFieldComponent name="password">
                <Input name="password" label="Password" type="password" store={fields.password} />
              </FormFieldComponent>
              <FormFieldComponent name="gender">
                <Radio name="gender" label="Gender" store={fields.gender} />
              </FormFieldComponent>
              <FormFieldComponent name="firstName">
                <Input label="FirstName" store={fields.firstName} />
              </FormFieldComponent>
              <FormFieldComponent name="lastName">
                <Input label="Last Name" store={fields.lastName} />
              </FormFieldComponent>
              <FormFieldComponent name="birthday">
                <Datepicker name="birthday" label="Birthday" store={fields.birthday} />
              </FormFieldComponent>
              <FormFieldComponent name="acceptTerms">
                <Checkbox name="acceptTerms" store={fields.acceptTerms}>
                  I agree to
                  <Link to="/pages/terms" target="_blank">
                    Terms and Conditions
                  </Link>
                  of service
                </Checkbox>
              </FormFieldComponent>
            </div>
            <div className="registration-page__column">
              <FormFieldComponent name="currency">
                <Select name="currency" label="Currency" store={fields.currency} />
              </FormFieldComponent>
              <FormFieldComponent name="country">
                <Select name="country" label="Country" placeholder="Select country" store={fields.country} />
              </FormFieldComponent>
              <FormFieldComponent name="city">
                <Input name="city" label="City" store={fields.city} />
              </FormFieldComponent>
              <FormFieldComponent name="zip">
                <Input name="zip" label="Postcode" store={fields.zip} />
              </FormFieldComponent>
              <FormFieldComponent name="street">
                <Input name="street" label="Address" store={fields.street} />
              </FormFieldComponent>
              <FormFieldComponent name="email">
                <Input name="email" label="Email" store={fields.email} />
              </FormFieldComponent>
              <FormFieldComponent name="phone">
                <Input name="mobile" label="Mobile" store={fields.phone} />
              </FormFieldComponent>
              <div className="form__row flex-row">
                <label className="control-label" />
                <div className="input-block btn-holder right">
                  <button className="btn yell-btn next-btn" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
