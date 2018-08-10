import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { I18nStore } from 'core'

import { AccountVerificationStore } from './verification.store'

interface Props {
  accountVerification?: AccountVerificationStore
  i18n?: I18nStore
}

@inject('i18n', 'accountVerification')
@observer
export class PhotoListComponent extends React.Component<Props, {}> {
  render() {
    const i18n = this.props.i18n!
    const store = this.props.accountVerification!

    return (
      <div className="verification__img-block">
        {store.photos.map((photo, index) => (
          <div className="verification__img-item" key={index + photo.attache}>
            <span
              className="verification__img-delete icon-plus-circled"
              onClick={photo.markForDeletion.bind(photo)}
            />
            <img src={photo.imageUrl} alt={photo.description} className="verification__img" />
            <strong className="verification__img-status">{i18n.t('t.status')} : </strong>
            {i18n.t(`t.photoStatuses.${photo.status}`)}
          </div>
        ))}
      </div>
    )
  }
}
