import React from 'react'
import Link from 'gatsby-link'

import styles from './NavTab.module.sass'

interface Props {
  id: string
  to: string
  text: string
  active?: boolean
}

export const NavTab = ({ id, to, text, active = false }: Props) => (
  <Link
    id={`navtab-${id}`}
    className={`no-wrap ${styles.tab} ${
      active ? `${styles.active} active` : ''
    }`}
    to={to}
  >
    {text}
  </Link>
)
