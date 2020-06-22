import React from 'react'
import { Link } from 'gatsby'

import styles from './Header.module.sass'
import { NavMenu } from '../navigation/NavMenu'
import { NavTab } from '../navigation/NavTab'

// export interface Props {}

export const Header = () => (
  <header className={styles.header}>
    <div className={`${styles.contents} standardWidth`}>
      <div className={styles.branding}>
        <Link to="/#home">ACD</Link>
      </div>
      <div className={styles.menu}>
        <NavMenu>
          <NavTab destination="/#about">About</NavTab>
          <NavTab destination="/#featured-projects">Projects</NavTab>
          <NavTab destination="/#hire-me">Hire Me</NavTab>
          <NavTab destination="/#blog-preview">Blog</NavTab>
          <NavTab destination="/#contact">Contact Me</NavTab>
        </NavMenu>
      </div>
    </div>
  </header>
)
