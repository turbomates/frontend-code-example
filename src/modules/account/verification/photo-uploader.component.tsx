import * as React from 'react'
import { observer, inject } from 'mobx-react'

import { I18nStore } from 'core'

import { AccountVerificationStore } from './verification.store'

interface Props {
  accountVerification?: AccountVerificationStore
  i18n?: I18nStore
}

@inject('i18n', 'accountVerification')
@observer
export class PhotoUploaderComponent extends React.Component<Props, {}> {
  handleFile(e: any) {
    const store = this.props.accountVerification!
    const fakeFilePath = e.target.value
    const fakePathString = 'fakepath'

    if (fakeFilePath.indexOf(fakePathString) !== -1) {
      const fakePathLength = fakePathString.length + fakeFilePath.indexOf(fakePathString) + 1
      store.file = fakeFilePath.substring(fakePathLength)
    }

    const reader = new FileReader()
    const file = e.target.files && e.target.files[0]
    reader.onload = e => store.add(reader.result)
    if (file) reader.readAsDataURL(file)
  }

  render() {
    const store = this.props.accountVerification!
    const i18n = this.props.i18n!

    return (
      <div className="verification__row">
        <div className="verification__col">
          <input
            className="verification__input"
            type="file"
            onChange={this.handleFile.bind(this)}
          />
          <div className="verification__ghost">
            <div className="verification__select-file">{i18n.t('t.select_file')}</div>
            <div className="verification__mess-file">{store.file}</div>
          </div>
        </div>
        <div className="verification__col">
          <input
            type="checkbox"
            onChange={store.toggleAgreement.bind(store)}
            id="agreementCheckbox"
          />
          <label htmlFor="agreementCheckbox">{i18n.t('agreement')}</label>
        </div>
      </div>
    )
  }
}
