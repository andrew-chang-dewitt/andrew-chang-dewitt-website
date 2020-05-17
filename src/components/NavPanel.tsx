import React from 'react'
import { Link } from 'gatsby'

import styles from './NavPanel.module.sass'

import { Headshot } from './Headshot'

export interface Props {
  navPanelStyle: string
}

interface NavOption {
  text: string
  path: string
}

const navOptions = [
  {
    text: 'Hire Me',
    path: '/hire-me',
  },
  {
    text: 'Blog',
    path: '/blog',
  },
  {
    text: 'About',
    path: '/about',
  },
  {
    text: 'Contact',
    path: '/contact',
  },
]

const renderNavOption = (item: NavOption) => (
  <div className={styles.navOption}>
    <Link to={item.path} activeClassName={styles.active}>
      {item.text}
    </Link>
  </div>
)

const whichNav = (style: string) => {
  if (style == 'default') {
    return (
      <div>
        <div className={styles.defaultHeadshot}>
          <Headshot />
        </div>
        <h1>
          <Link to="/">
            Andrew <span className="no-wrap">Chang-DeWitt</span>
          </Link>
        </h1>
        <div className={styles.nav}>
          {navOptions.map((option: NavOption) => renderNavOption(option))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className={styles.landingHeadshot}>
          <Headshot />
        </div>
      </div>
    )
  }
}

export const NavPanel = ({ navPanelStyle }: Props) => whichNav(navPanelStyle)
