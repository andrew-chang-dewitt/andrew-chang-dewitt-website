import React, { useEffect, useState } from 'react'
import { useLocation, WindowLocation } from '@reach/router'

import { NavTab } from './NavTab'

import styles from './NavMenu.module.sass'

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
}

interface Props {
  items: MenuItem[]
}

const setActiveItem = (
  items: MenuItem[],
  currentLocation: WindowLocation
): MenuItem[] => {
  const path = currentLocation.pathname.substr(1).split('/')[0]
  const hash = currentLocation.hash.substr(1)

  items.map((item) => {
    switch (item.key) {
      case path:
        item.active = true
        break

      case hash:
        item.active = path == '' ? true : false
        break

      default:
        item.active = false
    }
  })

  return items
}

export const buildMenu = (items: MenuItem[]) =>
  items.map(({ key, to, text, active }) => (
    <NavTab key={key} id={key} to={to} text={text} active={active} />
  ))

export const NavMenu = (props: Props) => {
  // const [location, setLocation] = useState(useLocation())
  const location = useLocation()
  // init nav menu items based on current component location
  const [items] = useState(setActiveItem(props.items, location))

  // listens for changes in window.location, using @reach/router API
  useEffect(() => {
    // doesn't actually need to do anything with the change here
    // ... this feels a little like black magic
  }, [location, items]) // updates items state object on location change

  return <nav className={styles.menu}>{buildMenu(items)}</nav>
}
