import React from 'react'

import styles from './NavMenu.module.sass'

import { ClickHandler } from './NavTab'

const handler = (e: React.MouseEvent, to: string): void => {
  console.log(`Nav: ${to}, event: ${e}`)
}

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
}

export interface ItemBuilder {
  (item: MenuItem, clickHandler: ClickHandler): JSX.Element
}

function buildMenu(
  menuItems: MenuItem[],
  builder: ItemBuilder,
  active: string | null
) {
  return menuItems.map((item) => {
    if (item.key === active) item.active = true

    console.log(item)

    return builder(item, handler)
  })
}

interface Props {
  items: MenuItem[]
  itemBuilder: ItemBuilder
  activePage?: null | string
}

export const NavMenu = ({ items, itemBuilder, activePage = null }: Props) => (
  <nav className={styles.menu}>{buildMenu(items, itemBuilder, activePage)}</nav>
)
