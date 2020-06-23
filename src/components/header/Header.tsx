import React from 'react'
import { Link } from 'gatsby'

import styles from './Header.module.sass'
import { NavMenu } from '../navigation/NavMenu'

export const Header = () => (
  <header className={styles.header}>
    <div className={`${styles.contents} standardWidth`}>
      <div className={styles.branding}>
        <Link to="/#home">ACD</Link>
      </div>
      <div className={styles.menu}>
        <NavMenu />
      </div>
    </div>
  </header>
)
