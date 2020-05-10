import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

export interface Props {
  pageTitle: string
}

export const Layout: FunctionComponent<Props> = ({ pageTitle, children }) => (
  <div>
    <div className={`${styles.header} layout-header`}>
      <h1>
        Hello:{' '}
        <span className={` ${styles.pageTitle} layout-pageTitle`}>
          {pageTitle}
        </span>
      </h1>
    </div>
    <div className={`${styles.content} layout-content`}>{children}</div>
  </div>
)
