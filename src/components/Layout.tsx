import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'

export interface Props {
  pageTitle?: string | null
  landing?: boolean
}

export const Layout: FunctionComponent<Props> = ({
  children,
  pageTitle = null,
  landing = false,
}) => (
  <div>
    {landing ? <Landing /> : null}
    <Header />
    <div id="main-content" className={styles.content}>
      {pageTitle ? <h1 className="title">{pageTitle}</h1> : null}
      {children}
    </div>
  </div>
)
