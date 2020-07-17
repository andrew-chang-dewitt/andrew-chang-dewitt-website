import React from 'react'
import { Link } from 'gatsby'

import styles from './Header.module.sass'

import { NavMenu, MenuItem } from '../navigation/NavMenu'

interface Props {
  navigationItems: MenuItem[]
  brandingVisibility?: boolean
}

export const Header = ({
  navigationItems,
  brandingVisibility = true,
}: Props) => (
  <header className={styles.header}>
    <div className={`${styles.contents} standardWidth`}>
      <div
        id="branding"
        className={`${styles.branding} ${
          brandingVisibility ? '' : 'hidden ' + styles.hidden
        }`}
      >
        <Link to="/#">ACD</Link>
      </div>
      <div className={styles.navigation}>
        <NavMenu items={navigationItems} />
      </div>
    </div>
  </header>
)
