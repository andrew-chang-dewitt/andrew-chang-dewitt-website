import React, { useEffect, useReducer } from 'react'
import { globalHistory, useLocation, WindowLocation } from '@reach/router'

import { NavTab } from './NavTab'

import styles from './NavMenu.module.sass'

export interface MenuItem {
  to: string
  text: string
  key: string
  active?: boolean
}

// export interface ItemBuilder {
//   (item: MenuItem): JSX.Element
// }

interface Props {
  items: MenuItem[]
  // itemBuilder: ItemBuilder
}

interface State {
  items: MenuItem[]
  location: WindowLocation
}

interface Action {
  type: string
  data?: any
}

function updateLocation(
  newLocation: null | WindowLocation = null
): WindowLocation {
  return newLocation ? newLocation : useLocation()
}

const setActiveItem = (
  items: MenuItem[],
  currentLocation: WindowLocation
): MenuItem[] => {
  items.map((item) => {
    switch (item.key) {
      case currentLocation.pathname.substr(1):
      case currentLocation.hash.substr(1):
        item.active = true
        break
      default:
        item.active = false
    }
  })

  return items
}

export const NavMenu = (props: Props) => {
  const startingLocation = updateLocation()
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'CHANGEACTIVETAB':
          return {
            ...state,
            items: setActiveItem(state.items, state.location),
          }
        case 'UPDATELOCATION':
          return {
            ...state,
            location: updateLocation(action.data),
          }
        default:
          return state
      }
    },
    {
      items: setActiveItem(props.items, startingLocation),
      location: startingLocation,
    }
  )

  // listens for changes in window.location, using @reach/router API
  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      dispatch({ type: 'UPDATELOCATION', data: location })
    })
  }, [])

  return (
    <nav className={styles.menu}>
      {state.items.map((item: MenuItem) => (
        <NavTab
          key={item.key}
          id={item.key}
          to={item.to}
          text={item.text}
          active={item.active}
        />
      ))}
    </nav>
  )
}
