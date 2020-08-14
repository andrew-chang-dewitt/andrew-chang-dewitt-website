import React, { RefObject } from 'react'
import Link from 'gatsby-link'

import { AnchorLink } from './AnchorLink'

import styles from './NavTab.module.sass'

interface Props {
  id: string
  to: string
  text: string
  contentTarget?: RefObject<HTMLDivElement>
  active?: boolean
}

export const NavTab = ({
  id,
  to,
  contentTarget,
  text,
  active = false,
}: Props) => {
  const resolved = {
    id: `navtab-${id}`,
    className: `no-wrap ${styles.tab} ${
      active ? `${styles.active} active` : ''
    }`,
  }

  const link = contentTarget ? (
    <AnchorLink id={resolved.id} to={to} target={contentTarget}>
      {text}
    </AnchorLink>
  ) : (
    <Link id={resolved.id} to={to}>
      {text}
    </Link>
  )

  return <li className={resolved.className}>{link}</li>
}
