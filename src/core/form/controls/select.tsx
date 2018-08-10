import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import cc from 'classcat'
import { FormField, IFormFieldProps, IFieldProps } from '../field'
import { Choice } from '../json'

export interface ISelectField extends IFormFieldProps {
  choices: Choice[]
}

export class SelectField extends FormField {
  @observable choices: Choice[]

  constructor(data: ISelectField) {
    super(data)
    this.choices = data.choices
  }
}

export interface ISelectProps extends IFieldProps {
  store: SelectField
}

@observer
export class Select extends React.Component<ISelectProps, {}> {
  get options() {
    const { placeholder, store } = this.props

    let options = store.choices.map(choice => (
      <option key={choice.value} value={choice.value}>
        {choice.label}
      </option>
    ))

    if (placeholder) {
      options.unshift(
        <option key="" value="">
          {placeholder}
        </option>
      )
    }

    return options
  }

  render() {
    const { name, label, store, visible = true } = this.props
    const { error, required, value } = store

    if (!visible) return null

    return (
      <div className="form__row flex-row">
        <label className="control-label">{label}</label>
        <div className={cc(['input-block', { 'has-error': error !== null }])}>
          <select
            name={name}
            value={value as string}
            onChange={(event: any) => {
              store.update(event.target.value)
            }}
          >
            {this.options}
          </select>
          <div className="error-box">{error}</div>
        </div>
        {required && <div className="star">*</div>}
      </div>
    )
  }
}
