import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

export interface Props {
  destination: string
  active?: boolean
}

export const NavTab: FunctionComponent<Props> = ({
  children,
  destination,
  active,
}) => (
  <div className={active ? 'active' : ''}>
    <Link to={destination}>
      {destination}, active: {active}, children: {children}
    </Link>
  </div>
)

NavTab.defaultProps = {
  active: false,
}
