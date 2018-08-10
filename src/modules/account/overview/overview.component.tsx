import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { I18nStore } from 'core'
import { Input, Select } from 'core/form'

import { AccountOverviewStore } from './overview.store'
import { FormFieldComponent } from './form-field.component'

import './overview.css'

interface Props {
  accountOverview?: AccountOverviewStore
  i18n?: I18nStore
}

@inject('accountOverview', 'i18n')
@observer
export class OverviewComponent extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.accountOverview!.load()
  }

  render() {
    const i18n = this.props.i18n!
    const overview = this.props.accountOverview!
    const { mode, user, form } = overview
    if (!user || !form) return null

    return (
      <div className="overview__content-block content__block content__block_account">
        <h1 className="overview__page-title account__title">{i18n.t('t.account_overview')}</h1>
        <form
          className="overview__form"
          onSubmit={e => {
            e.preventDefault()
            overview.sendEditedProfile()
          }}
        >
          <fieldset className="overview__fieldset">
            <FormFieldComponent mode={mode} name="username" value={user.username}>
              <Input label={i18n.t('t.overview_username')} store={form.fields.username} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="lastName" value={user.profile.lastName}>
              <Input label={i18n.t('t.overview_lastname')} store={form.fields.lastName} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="firstName" value={user.profile.firstName}>
              <Input label={i18n.t('t.overview_firstname')} store={form.fields.firstName} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="code" value={user.code} />

            <FormFieldComponent mode={mode} name="email" value={user.email} />

            <FormFieldComponent mode={mode} name="phone" value={user.profile.location.phone}>
              <Input label={i18n.t('t.overview_phone')} store={form.fields.phone} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="country" value={user.profile.location.country}>
              <Select label={i18n.t('t.overview_country')} store={form.fields.country} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="city" value={user.profile.location.city}>
              <Input label={i18n.t('t.overview_city')} store={form.fields.city} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="street" value={user.profile.location.street}>
              <Input label={i18n.t('t.overview_street')} store={form.fields.street} />
            </FormFieldComponent>

            <FormFieldComponent mode={mode} name="currency" value={user.settings.currency} />

            <FormFieldComponent mode={mode} name="zip" value={user.profile.location.zip}>
              <Input label={i18n.t('t.overview_zip')} store={form.fields.zip} />
            </FormFieldComponent>
          </fieldset>
          {mode === 'view' && (
            <button className="btn btn-accent overview__btn" onClick={() => overview.toggleMode()}>
              {i18n.t('t.edit_profile')}
            </button>
          )}
          {mode === 'edit' && (
            <div>
              <button className="btn btn-accent overview__btn" type="submit">
                {i18n.t('t.save_changes')}
              </button>
              <button
                className="btn overview__btn-cancel"
                onClick={e => {
                  e.preventDefault()
                  overview.toggleMode()
                }}
              >
                {i18n.t('t.cancel')}
              </button>
            </div>
          )}
        </form>
      </div>
    )
  }
}
