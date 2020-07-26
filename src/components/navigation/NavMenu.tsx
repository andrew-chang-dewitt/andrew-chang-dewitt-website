import React, { RefObject } from 'react'

import { NavTab } from './NavTab'

import styles from './NavMenu.module.sass'

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
  targetRef?: RefObject<HTMLDivElement>
}

interface Props {
  items: MenuItem[]
}

export const NavMenu = ({ items }: Props) => {
  return (
    <nav className={styles.navigation}>
      {items.map(({ key, to, text, active, targetRef }) => (
        <NavTab
          key={key}
          id={key}
          to={to}
          text={text}
          active={active}
          contentTarget={targetRef}
        />
      ))}
    </nav>
  )
}
