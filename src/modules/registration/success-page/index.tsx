import * as React from 'react'
import { observer, inject } from 'mobx-react'

import { I18nStore } from 'core'
import { Input } from 'core/form'

import { RegistrationSuccessStore } from './success-page.store'

interface Props {
  i18n?: I18nStore
  registrationSuccess?: RegistrationSuccessStore
}

@inject('registrationSuccess', 'i18n')
@observer
export class SuccessPage extends React.Component<Props, {}> {
  render() {
    const i18n = this.props.i18n!
    const { fields } = this.props.registrationSuccess!.form

    return (
      <div className="congrats">
        <div className="visual">
          <div className="title">{i18n.t('t.registration_complete_title')}</div>
          <div className="text">{i18n.t('t.registration_complete_message')}</div>
          <form
            onSubmit={(event: any) => {
              event.preventDefault()
              this.props.registrationSuccess!.submit()
            }}
          >
            <input name="username" style={{ display: 'none' }} />
            <input name="password" style={{ display: 'none' }} />
            <Input placeholder={i18n.t('t.email')} store={fields.username} />
            <Input type="password" placeholder={i18n.t('t.password')} store={fields.password} />
            <div className="btn-holder">
              <button type="submit" className="btn yell-btn">
                {i18n.t('t.log_in')}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
