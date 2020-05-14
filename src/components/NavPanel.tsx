import React from 'react'

import styles from './NavPanel.module.sass'

import { Headshot } from './Headshot'

export interface Props {
  navPanelStyle: string
}

const whichNav = (style: string) => {
  if (style == 'default') {
    return (
      <div>
        <div className={styles.defaultHeadshot}>
          <Headshot />
        </div>
        <h1 className="title">Default</h1>
      </div>
    )
  } else {
    return (
      <div>
        <div className={styles.landingHeadshot}>
          <Headshot />
        </div>
        <h1 className="title">Landing</h1>
      </div>
    )
  }
}

export const NavPanel = ({ navPanelStyle }: Props) => whichNav(navPanelStyle)
