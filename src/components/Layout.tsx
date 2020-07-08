import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'

export interface Props {
  pageTitle: string
  landing?: boolean
}

export const Layout: FunctionComponent<Props> = ({
  children,
  pageTitle,
  landing = false,
}) => (
  <div>
    {landing ? (
      <div id="landing">
        <Landing />
      </div>
    ) : null}
    <div id="header">
      <Header />
    </div>
    <div id="main-content" className={styles.content}>
      <h1 className="title">{pageTitle}</h1>
      {children}
    </div>
  </div>
)
