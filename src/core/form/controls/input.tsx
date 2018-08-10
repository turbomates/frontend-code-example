import * as React from 'react'
import { observer } from 'mobx-react'
import cc from 'classcat'

import '../form.css'

import { FormField, IFormFieldProps, IFieldProps } from '../field'

export interface IInputField extends IFormFieldProps {}

export class InputField extends FormField {
  constructor(data: IInputField) {
    super(data)
  }
}

type InputType = 'text' | 'password' | 'email'
export interface IInputProps extends IFieldProps {
  store: InputField
  type?: InputType
}

export const Input = observer((props: IInputProps) => {
  const { name, label, store, placeholder, visible = true, type = 'text' } = props
  const { error, required, value } = store

  if (!visible) return null

  const input = (
    <div className={cc(['form__input-block', { 'has-error': error !== null }])}>
      <input
        type={type}
        name={name}
        onChange={(event: any) => {
          event.preventDefault()
          store.update(event.target.value)
        }}
        placeholder={placeholder}
        value={value as string}
        className="form__input input"
      />
      <div className="form__error-box">{error}</div>
    </div>
  )

  if (!label) return input

  return (
    <div className="form__row">
      <label className="form__row-label">{label}</label>
      {input}
      {required && <div className="form__input-star">*</div>}
    </div>
  )
})
