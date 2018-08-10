import * as React from 'react'
import { observer } from 'mobx-react'
import cc from 'classcat'
import { FormField, IFieldProps, IFormFieldProps } from '../field'

export interface ICheckboxField extends IFormFieldProps {}
export class CheckboxField extends FormField {}

export interface Props extends IFieldProps {
  store: CheckboxField
}

@observer
export class Checkbox extends React.Component<Props> {
  render() {
    const { children, name, store, visible = true } = this.props
    const { error, value } = store

    if (!visible) return null

    return (
      <div className={cc(['input-block form__group', { 'has-error': error !== null }])}>
        <label htmlFor={name}>{children}</label>
        <input
          type="checkbox"
          name={name}
          onChange={(event: any) => store.update(event.target.checked)}
          checked={value as boolean}
          style={{ float: 'left' }}
        />
        <div className="error-box">{error}</div>
      </div>
    )
  }
}
