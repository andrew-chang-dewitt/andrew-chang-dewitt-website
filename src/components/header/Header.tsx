import React from 'react'

import styles from './Header.module.sass'
import { NavMenu } from '../navigation/NavMenu'
import { NavTab } from '../navigation/NavTab'

// export interface Props {}

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.brandingArea}></div>
    <NavMenu>
      <NavTab destination="/#about">About</NavTab>
      <NavTab destination="/#projects">Projects</NavTab>
      <NavTab destination="/#hire-me">Hire Me</NavTab>
      <NavTab destination="/#blog">Blog</NavTab>
      <NavTab destination="/#contact">Contact Me</NavTab>
    </NavMenu>
  </header>
)
