import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { I18nStore } from 'core'
import { Input } from 'core/form'
import { AccountPasswordChangeStore } from './password-change.store'

import './password-change.css'

interface Props {
  accountPasswordChange?: AccountPasswordChangeStore
  i18n?: I18nStore
}

@inject('accountPasswordChange', 'i18n')
@observer
export class PasswordChangeComponent extends React.Component<Props, {}> {
  render() {
    const i18n = this.props.i18n!
    const store = this.props.accountPasswordChange!
    const { currentPassword, first, second } = store.fields

    return (
      <div className="pwd-change__content-block content__block content__block_account">
        <h1 className="pwd-change__title account__title">{i18n.t('t.password_change')}</h1>
        <form
          className="pwd-change__form"
          onSubmit={e => {
            e.preventDefault()
            store.submit()
          }}
        >
          <fieldset className="pwd-change__fieldset">
            <input key="fake_old_password" name="password" style={{ display: 'none' }} />
            <input key="fake_new_password" name="password" style={{ display: 'none' }} />
            <input key="fake_repeat_password" name="password" style={{ display: 'none' }} />
            <Input label={i18n.t('t.old_password')} type="password" store={currentPassword} visible />
            <Input label={i18n.t('t.new_password')} type="password" store={first} visible />
            <Input label={i18n.t('t.repeat_password')} type="password" store={second} visible />
          </fieldset>
          <button className="pwd-change__btn btn btn-accent" type="submit">
            {i18n.t('t.change')}
          </button>
        </form>
      </div>
    )
  }
}
