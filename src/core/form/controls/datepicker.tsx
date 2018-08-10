import * as React from 'react'
import * as datepicker from 'pickmeup'
import cc from 'classcat'
import { FormField, IFormFieldProps, IFieldProps } from '../field'

import 'pickmeup/css/pickmeup.css'

export interface IDateField extends IFormFieldProps {}

export class DateField extends FormField {
  constructor(data: IDateField) {
    super(data)
  }
}

export interface IDateProps extends IFieldProps {
  store: DateField
  format?: string
}

export class Datepicker extends React.Component<IDateProps, {}> {
  static defaultProps = {
    format: 'd/m/Y',
    visible: true,
  }

  componentDidMount() {
    if (!this.element) return

    datepicker(this.element, {
      format: this.props.format,
      default_date: false,
      date: this.props.store.value,
    })

    this.element.addEventListener('pickmeup-change', (event: any) => {
      this.props.store.update(event.target.value)
    })
  }

  componentWillUnmount() {
    // datepicker(this.element).destroy()
  }

  get element() {
    return document.getElementById(this.inputID)
  }

  get inputID() {
    return `${this.props.name || 'date'}-datepicker`
  }

  render() {
    const { name, label, store, visible } = this.props
    const { error, required, value } = store

    if (!visible) return null

    return (
      <div className="form__row flex-row">
        <label className="control-label">{label}</label>
        <div className={cc(['input-block', { 'has-error': error !== null }])}>
          <label className="input-holder">
            <input id={this.inputID} name={name} value={value as string} />
          </label>
          <div className="error-box">{error}</div>
        </div>
        {required && <div className="star">*</div>}
      </div>
    )
  }
}
