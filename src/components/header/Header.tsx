import React from 'react'
import { Link } from 'gatsby'

import styles from './Header.module.sass'

import { NavMenu, MenuItem } from '../navigation/NavMenu'
import { BuildNavTab } from '../navigation/NavTab'

const items: MenuItem[] = [
  {
    to: '/#about',
    text: 'About',
    key: 'about',
  },
  {
    to: '/#featured-projects',
    text: 'Projects',
    key: 'featured-projects',
  },
  {
    to: '/#hire-me',
    text: 'Hire Me',
    key: 'hire-me',
  },
  {
    to: '/#contact-me',
    text: 'Contact Me',
    key: 'contact-me',
  },
  {
    to: '/blog',
    text: 'Blog',
    key: 'blog',
  },
]

interface Props {
  activePage?: null | string
}

export const Header = ({ activePage = null }: Props) => (
  <header className={styles.header}>
    <div className={`${styles.contents} standardWidth`}>
      <div className={styles.branding}>
        <Link to="/#home">ACD</Link>
      </div>
      <div className={styles.menu}>
        <NavMenu
          items={items}
          itemBuilder={BuildNavTab}
          activePage={activePage}
        />
      </div>
    </div>
  </header>
)
