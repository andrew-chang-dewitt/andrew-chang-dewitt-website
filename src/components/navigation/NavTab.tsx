import React from 'react'
import { Link } from 'gatsby'

import { MenuItem, ItemBuilder } from './NavMenu'

import styles from './NavTab.module.sass'

export interface ClickHandler {
  (e: React.MouseEvent, target: string): void
}

interface Props {
  item: MenuItem
  handler: ClickHandler
}

export const NavTab = (props: Props) => (
  <div
    id={props.item.key}
    className={`no-wrap ${styles.tab} ${
      props.item.active ? `${styles.active} active` : ''
    }`}
  >
    <Link onClick={(e) => props.handler(e, props.item.to)} to={props.item.to}>
      {props.item.text}
    </Link>
  </div>
)

export const BuildNavTab: ItemBuilder = (
  item: MenuItem,
  handler: ClickHandler
) => <NavTab item={item} handler={handler}></NavTab>
