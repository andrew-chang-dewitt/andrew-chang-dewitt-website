import React from 'react'

import { NavTab } from './NavTab'

import styles from './NavMenu.module.sass'

export const NavMenu = () => (
  <nav className={styles.menu}>
    <NavTab destination="#about">About</NavTab>
    <NavTab destination="#featured-projects">Projects</NavTab>
    <NavTab destination="#hire-me">Hire Me</NavTab>
    <NavTab destination="#blog-preview">Blog</NavTab>
    <NavTab destination="#contact-me">Contact Me</NavTab>
  </nav>
)
