import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-mobx-router'
import { ConfigStore, T } from 'core'

interface Props {
  config?: ConfigStore
}

@inject('config')
@observer
export class AccountNavigationComponent extends React.Component<Props, {}> {
  render() {
    const config = this.props.config!

    return (
      <div className="account__aside__block aside__side-block">
        <ul className="account__menu">
          <li className="aside__item">
            <NavLink className="aside__link" activeClassName="active" exact to="/account">
              <T template="t.account_overview" />
            </NavLink>
          </li>
          <li className="aside__item">
            <NavLink className="aside__link" activeClassName="active" to="/account/verification">
              <T template="t.verification" />
            </NavLink>
          </li>
          <li className="aside__item">
            <NavLink className="aside__link" activeClassName="active" to="/account/change_password">
              <T template="t.change_password" />
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}
