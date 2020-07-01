import React from 'react'
import { globalHistory } from '@reach/router'

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

interface State {
  items: MenuItem[]
}

export class NavMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    let location: Location | null = null
    if (typeof window !== 'undefined') location = window.location

    let items = this.props.items.map((item) => {
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

    this.state = { items: items }
  }

  public componentDidMount() {
    globalHistory.listen(({ location }) => {
      console.log('pathname', location.pathname, 'hash', location.hash)
      if (location.pathname === '/') this.setActiveItem(location.hash.substr(1))
      else this.setActiveItem(location.pathname)
    })
  }

  setActiveItem(itemKey: string) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.key === itemKey) item.active = true
        else item.active = false

        return item
      }),
    })
  }

  render() {
    return (
      <nav className={styles.menu}>
        {this.state.items.map((item) => {
          return this.props.itemBuilder(item)
        })}
      </nav>
    )
  }
}
