import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { I18nStore } from 'core'

import { PhotoUploaderComponent } from './photo-uploader.component'
import { PhotoListComponent } from './photo-list.component'
import { AccountVerificationStore } from './verification.store'

import './verification.css'

const DEFAULT_VERIFICATION_TEXT = `
    To complete your account please provide us with a scanned copy of your passport,
    drivers license or national ID. This information is used to verify your identity.
    Which is required by law. It will not be shared with any third parties.
    You can withdraw once your account is approved.
`

interface Props {
  accountVerification?: AccountVerificationStore
  i18n?: I18nStore
}

@inject('i18n', 'accountVerification')
@observer
export class VerificationComponent extends React.Component<Props, {}> {
  componentWillMount() {
    const store = this.props.accountVerification!

    store.loadText()
    store.loadPhotos()
  }

  render() {
    const store = this.props.accountVerification!
    const i18n = this.props.i18n!

    const text = store.textLoaded ? store.text || DEFAULT_VERIFICATION_TEXT : null

    return (
      <div className="verification__block content__block content__block_account">
        <h1 className="verification__title account__title">{i18n.t('t.verification')}</h1>
        <p className="verification__annotation">{text}</p>
        <form className="verification__form">
          <PhotoUploaderComponent />
          <PhotoListComponent />
          <button
            type="button"
            className="btn btn-accent verification__btn"
            onClick={e => store.send()}
          >
            {i18n.t('t.save_changes')}
          </button>
        </form>
      </div>
    )
  }
}
