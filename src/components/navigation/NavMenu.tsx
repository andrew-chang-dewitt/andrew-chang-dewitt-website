import React, {
  // useEffect,
  // useState,
  MutableRefObject,
} from 'react'
// import { useLocation } from '@reach/router'

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

// const useItems = (startingItems: MenuItem[]) => {
//   // const [location, setLocation] = useState(useLocation())
//   const location = useLocation()
//   const path = location.pathname.substr(1).split('/')[0]
//   const hash = location.hash.substr(1)
//
//   // determines if a given item should is considered active
//   // based on the current location
//   const isActiveItem = (item: MenuItem): boolean => {
//     switch (item.key) {
//       case path:
//         return true
//
//       case hash:
//         return path === ''
//
//       default:
//         return false
//     }
//   }
//
//   const setActiveItem = (oldItems: MenuItem[]): MenuItem[] =>
//     oldItems.map((item) => {
//       item.active = isActiveItem(item)
//       return item
//     })
//
//   // init nav menu items based on current component location
//   const [items, setItems] = useState(setActiveItem(startingItems))
//
//   // updates items state object on location change
//   useEffect(() => {
//     setItems(setActiveItem(items))
//   }, [location])
//   return items
// }

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
