import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

import styles from './NavTab.module.sass'

export interface Props {
  destination: string
  active?: boolean
}

export const NavTab: FunctionComponent<Props> = ({
  children,
  destination,
  active = false,
}) => (
  <div className={`no-wrap ${styles.tab} ${active ? styles.active : ''}`}>
    <Link to={destination}>{children}</Link>
  </div>
)
