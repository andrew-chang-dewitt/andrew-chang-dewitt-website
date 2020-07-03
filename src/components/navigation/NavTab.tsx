import React from 'react'
import Link from 'gatsby-link'

import {
  MenuItem,
  // ItemBuilder
} from './NavMenu'

import styles from './NavTab.module.sass'

interface Props {
  item: MenuItem
}

export const NavTab = (props: Props) => (
  <div
    id={`link-${props.item.key}`}
    className={`no-wrap ${styles.tab} ${
      props.item.active ? `${styles.active} active` : ''
    }`}
  >
    <Link to={props.item.to}>{props.item.text}</Link>
  </div>
)
//
// export const BuildNavTab: ItemBuilder = (item: MenuItem) => (
//   <NavTab item={item} key={item.key}></NavTab>
// )
