import React, { RefObject } from 'react'

import { NavTab } from './NavTab'
import { HamburgerIcon } from './HamburgerIcon'

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
  const [menuOpen, setMenuOpen] = React.useState(false)

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.hamburgerButton}>
        <HamburgerIcon opened={menuOpen} buttonHandler={toggleMenu} />
      </div>
      <ul className={`${styles.menu} ${menuOpen ? styles.opened : ''}`}>
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
      </ul>
    </nav>
  )
}
