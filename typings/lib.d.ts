// Vendor
import * as React from 'react'

declare global {

  type Stage = 'dev' | 'prod'

  interface Money {
    amount: number
    currency: string
  }

  // System

  interface ISystemStatic {
    import(request: string): Promise<any>
  }
  const System: ISystemStatic

  interface Window {
    sg: any
  }

  interface Dict {
    [key: string]: string
  }

  interface ParametrizedError {
    message: string
    messageTemplate: string
    parameters: { [key: string]: string }
  }
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
