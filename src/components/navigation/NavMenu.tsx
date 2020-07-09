import React, { useEffect, useState, MutableRefObject } from 'react'
import { useLocation } from '@reach/router'

import { NavTab } from './NavTab'

import styles from './NavMenu.module.sass'

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
  targetRef?: MutableRefObject<any>
}

interface Props {
  items: MenuItem[]
}

const useItems = (startingItems: MenuItem[]) => {
  // const [location, setLocation] = useState(useLocation())
  const location = useLocation()
  const path = location.pathname.substr(1).split('/')[0]
  const hash = location.hash.substr(1)

  // determines if a given item should is considered active
  // based on the current location
  const isActiveItem = (item: MenuItem): boolean => {
    switch (item.key) {
      case path:
        return true

      case hash:
        return path === ''

      default:
        return false
    }
  }
  // init nav menu items based on current component location
  const [items, setItems] = useState(
    startingItems.map((item) => {
      item.active = isActiveItem(item)
      return item
    })
  )

  // updates items state object on location change
  useEffect(() => {
    // this call to setItems isn't able to be tested since it's inside
    // a useEffect hook, but that's okay because it's safe to assume that
    // both useEffect & the setter returned by useState (which setItems is)
    // are both well tested by React
    setItems(
      items.map((item) => {
        item.active = isActiveItem(item)
        return item
      })
    )
  }, [location])
  return items
}

const buildMenu = (items: MenuItem[]) =>
  items.map(({ key, to, text, active, targetRef }) => (
    <NavTab
      key={key}
      id={key}
      to={to}
      text={text}
      active={active}
      contentTarget={targetRef}
    />
  ))

export const NavMenu = (props: Props) => {
  const items = useItems(props.items)
  return <nav className={styles.menu}>{buildMenu(items)}</nav>
}
