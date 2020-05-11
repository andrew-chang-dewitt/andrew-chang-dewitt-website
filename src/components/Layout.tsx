import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

import { Header } from './Header'

export interface Props {
  pageTitle: string
}

export const Layout: FunctionComponent<Props> = ({
  // pageTitle,
  children,
}) => (
  <div>
    <div className={`${styles.header} layout-header`}>
      <Header />
    </div>
    <div className={styles.pageGrid}>
      <div className={styles.navbar}></div>
      <div className={styles.page}>
        <div className={`${styles.content} layout-content`}>{children}</div>
      </div>
    </div>
  </div>
)
