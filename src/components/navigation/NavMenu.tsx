import React, { FunctionComponent } from 'react'

import styles from './NavMenu.module.sass'

export const NavMenu: FunctionComponent = ({ children }) => (
  <nav className={styles.menu}>{children}</nav>
)
