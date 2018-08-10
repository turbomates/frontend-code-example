import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ConfigStore, I18nStore } from 'core'

interface Props {
  name?: string
  value?: string
  mode?: 'view' | 'edit'
  config?: ConfigStore
  i18n?: I18nStore
}

@inject('config', 'i18n')
@observer
export class FormFieldComponent extends React.Component<Props, {}> {
  render() {
    const { value, mode, children, name = '', config } = this.props
    const fieldsMap =
      (config!.data.frontConfiguration && config!.data.frontConfiguration['user.fields']) || {}

    if (!fieldsMap[name] || !fieldsMap[name].account) return null

    if (mode === 'view' || !fieldsMap[name].editable) {
      return (
        <div className="overview__row">
          <label className="overview__row-label">{this.props.i18n!.t(`t.overview_${name}`)}</label>
          <span className="overview__row-values">{value || '-'}</span>
        </div>
      )
    } else if (children) {
      return children
    } else {
      return null
    }
  }
}
