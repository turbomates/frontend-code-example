declare module 'react-mobx-router' {
  import * as React from 'react'
  import * as H from 'history'

  interface BrowserRouterProps {
    basename?: string
    forceRefresh?: boolean
    keyLength?: number
    getUserConfirmation?(message: string, callback: Function): void
  }
  export class BrowserRouter extends React.Component<BrowserRouterProps, {}> {}

  export interface RouteComponentProps<P> {
    match: match<P>
    location: H.Location
    history: H.History
    staticContext?: any
  }

  export interface RouteProps {
    location?: H.Location
    component?: React.ComponentType<RouteComponentProps<any> | {}>
    path?: string
    exact?: boolean
    strict?: boolean
  }

  export class Route<T extends RouteProps = RouteProps> extends React.Component<T> {}

  export interface match<P> {
    params: P
    isExact: boolean
    path: string
    url: string
  }

  interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: H.LocationDescriptor
    replace?: boolean
  }
  export class Link extends React.Component<LinkProps> {}

  interface NavLinkProps extends LinkProps {
    activeClassName?: string
    activeStyle?: React.CSSProperties
    exact?: boolean
    strict?: boolean
    isActive?<P>(match: match<P>, location: H.Location): boolean
  }
  export class NavLink extends React.Component<NavLinkProps> {}

  export const Match: any
  export const Router: any
  export const Switch: any
  export const Redirect: any
}

declare module 'mobx-history' {
  interface MobxHistory {
    listen(handler: Function): void
    push(state: any): void
    location: string
  }
}

declare module 'mobx-history/createBrowserHistory' {
  import { MobxHistory } from 'mobx-history'

  const createHistory: () => MobxHistory
  export default createHistory
}

declare module 'react-utilities/Delegate' {
  const Delegate: any
  export default Delegate
}
