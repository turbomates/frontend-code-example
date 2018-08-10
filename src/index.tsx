import * as React from 'react'
import * as ReactDom from 'react-dom'
import { AppStore, ConfigStore, createStore } from 'core'
import { App } from 'modules/app.module'

async function render() {
  const stage: Stage = process.env.STAGE ? (process.env.STAGE as Stage) : 'dev'
  const config = new ConfigStore(stage)
  await config.load()

  const app: AppStore = createStore(config)
  await import(`projects/${config.data.project}/assets/style.css`)
  await import(`assets/themes/${config.data.frontConfiguration.theme}/style.css`)
  await this.app.user.load()
  await this.app.i18n.load()

  ReactDom.render(<App {...app} />, document.getElementById('root') || document.body)
}

render()
