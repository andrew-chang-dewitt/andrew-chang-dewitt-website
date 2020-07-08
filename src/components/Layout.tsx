import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

import { Header } from './header/Header'

export interface Props {
  pageTitle: string
}

export const Layout: FunctionComponent<Props> = ({ children, pageTitle }) => (
  <div>
    <Header />
    <div id="main-content" className={styles.content}>
      <h1 className="title">{pageTitle}</h1>
      {children}
    </div>
  </div>
)
