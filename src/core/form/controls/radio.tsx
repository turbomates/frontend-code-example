import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import cc from 'classcat'
import { FormField, IFormFieldProps, IFieldProps } from '../field'
import { Choice } from '../json'

export interface IRadioField extends IFormFieldProps {
  choices: Choice[]
}

export class RadioField extends FormField {
  @observable choices: Choice[]

  constructor(data: IRadioField) {
    super(data)
    this.choices = data.choices
  }
}

export interface IRadioProps extends IFieldProps {
  store: RadioField
}

export const Radio = observer((props: IRadioProps) => {
  const { label, store, visible = true } = props
  const { error, choices, required, value } = store

  if (!visible || !choices.length) return null

  return (
    <div className="form__row flex-row">
      <label className="control-label">{label}</label>
      <div className={cc(['input-block', { 'has-error': error === null }])}>
        <ul className="radio-list inline">
          {choices.map(choice => (
            <li key={choice.value}>
              <label className="radio-holder">
                <div className={cc(['radio', { checked: value === choice.value }])}>
                  <input
                    type="radio"
                    className="radio icheck"
                    onChange={(event: any) => store.update(event.target.value)}
                    value={choice.value}
                    checked={value === choice.value}
                  />
                  <ins className="icheck iCheck-helper" />
                </div>
                <span className="radio-label">{choice.label}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="error-box">{error}</div>
      </div>
      {required && <div className="star">*</div>}
    </div>
  )
})
