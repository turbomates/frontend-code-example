import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { I18nStore } from './store'

interface Props {
  i18n?: I18nStore
  template: string
}

export const T = inject('i18n')(
  observer((props: Props) => <React.Fragment>{props.i18n!.t(props.template)}</React.Fragment>)
)
