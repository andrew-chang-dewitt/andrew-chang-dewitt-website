import React from 'react'
import Link from 'gatsby-link'

import styles from './NavTab.module.sass'

interface Props {
  // item: MenuItem
  id: string
  to: string
  text: string
  active?: boolean
}

export const NavTab = ({ id, to, text, active = false }: Props) => (
  <div
    id={`navtab-${id}`}
    className={`no-wrap ${styles.tab} ${
      active ? `${styles.active} active` : ''
    }`}
  >
    <Link to={to}>{text}</Link>
  </div>
)
//
// export const BuildNavTab: ItemBuilder = (item: MenuItem) => (
//   <NavTab item={item} key={item.key}></NavTab>
// )
