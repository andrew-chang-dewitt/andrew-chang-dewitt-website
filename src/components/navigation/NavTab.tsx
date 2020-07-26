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

  if (contentTarget) {
    return (
      <AnchorLink
        id={resolved.id}
        className={resolved.className}
        to={to}
        target={contentTarget}
      >
        {text}
      </AnchorLink>
    )
  } else {
    return (
      <Link id={resolved.id} className={resolved.className} to={to}>
        {text}
      </Link>
    )
  }
}
