import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

import { Header } from './Header'
import { Headshot } from './Headshot'

export interface Props {
  childClassPrefix: string
}

export const Layout: FunctionComponent<Props> = ({
  childClassPrefix,
  children,
}) => (
  <div>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.pageGrid}>
      <div className={`${styles.navbar}`}>
        <div className={`${childClassPrefix}-headshot`}>
          <Headshot />
        </div>
      </div>
      <div className={styles.page}>
        <div className="layoutContent">{children}</div>
      </div>
    </div>
  </div>
)

Layout.defaultProps = {
  childClassPrefix: 'default',
}
