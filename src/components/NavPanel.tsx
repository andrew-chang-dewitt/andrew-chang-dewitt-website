import React from 'react'

import styles from './NavPanel.module.sass'

import { Headshot } from './Headshot'

export interface Props {
  navPanelStyle: string
}

export const NavPanel = ({ navPanelStyle }: Props) => (
  <div className={styles.landingHeadshot}>
    {navPanelStyle}
    <Headshot />
  </div>
)
