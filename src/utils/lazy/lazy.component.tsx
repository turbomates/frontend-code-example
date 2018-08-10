import * as React from 'react'
import { Redirect } from 'react-mobx-router'

export interface Props {
  /**
   * A callback which will fetch your module.
   */
  fetch: () => Promise<any>
  /**
   * Component fetching condition. If false, redirects to /404.
   */
  enabled?: boolean
  /**
   * If no `componentName` is given, the default export will be used.
   */
  componentName?: string
  /**
   * The component which will be shown while the requested module will be loaded.
   */
  loaderComponent?: JSX.Element | null
  /**
   * All other props will be passed to the resolved component.
   */
  [key: string]: any
}

export interface State {
  result: any | null
  error: any
}

export class Lazy extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    enabled: true,
    componentName: 'default',
    loaderComponent: null, // <p>Loading...</p>
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      result: null,
      error: null,
    }
  }

  async componentDidMount() {
    if (!this.props.enabled) return

    try {
      const result = await this.props.fetch()
      this.setState({ result })
    } catch (error) {
      console.error(error)
      this.setState({ error })
    }
  }

  render() {
    const {
      enabled,
      fetch,
      errorComponent,
      componentName,
      loaderComponent,
      ...compProps,
    } = this.props
    const { result, error } = this.state

    if (!enabled) {
      return <Redirect to="/404" />
    }

    if (result) {
      const Component = result[componentName!]
      return <Component {...compProps} />
    } else if (error) {
      return null
    } else {
      return loaderComponent!
    }
  }
}
