import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, runInAction } from 'mobx'
import { MobxHistory, HttpStore } from 'core'

interface Props {
  history?: MobxHistory
  http?: HttpStore
  token?: string // from url
}

@inject('history', 'http')
@observer
export class Confirmation extends React.Component<Props, {}> {
  @observable hasError = false

  componentDidMount() {
    const { token } = this.props
    const history = this.props.history!
    const http = this.props.http!

    if (!token) return

    http
      .post('player/registration/confirm/' + token)
      .then(() => history.push('/player/success'))
      .catch(() => runInAction(() => (this.hasError = true)))
  }

  render() {
    if (this.hasError) {
      return (
        <div className="message fail">
          <span>This token is not valid</span>
        </div>
      )
    }

    return <div>Token cheking...</div>
  }
}
