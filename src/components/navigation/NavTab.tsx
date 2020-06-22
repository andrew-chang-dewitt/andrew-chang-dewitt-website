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
  active,
}) => (
  <div className={`${styles.tab} ${active ? 'active' : ''} no-wrap`}>
    <Link to={destination}>{children}</Link>
  </div>
)

NavTab.defaultProps = {
  active: false,
}
