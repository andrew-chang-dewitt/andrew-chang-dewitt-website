import React, { useState, useEffect } from 'react'
import { globalHistory, useLocation } from '@reach/router'

import styles from './NavMenu.module.sass'

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
}

export interface ItemBuilder {
  (item: MenuItem): JSX.Element
}

interface Props {
  items: MenuItem[]
  itemBuilder: ItemBuilder
}

export const NavMenu = (props: Props) => {
  const location = useLocation()
  const [items, setItems] = useState(
    props.items.map((item) => {
      switch (item.key) {
        case location.pathname.substr(1):
        case location.hash.substr(1):
          item.active = true
          break
        default:
          item.active = false
      }

      return item
    })
  )

  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      if (location.pathname === '/')
        handleActiveItemChange(location.hash.substr(1))
      else handleActiveItemChange(location.pathname)
    })
  }, [])

  const handleActiveItemChange = (itemKey: string): void => {
    setItems(
      items.map((item) => {
        if (item.key === itemKey) item.active = true
        else item.active = false

        return item
      })
    )
  }

  return (
    <nav className={styles.menu}>
      {items.map((item) => {
        return props.itemBuilder(item)
      })}
    </nav>
  )
}
