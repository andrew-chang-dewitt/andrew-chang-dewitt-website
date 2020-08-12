import React, { RefObject } from 'react'

import { AnchorLink } from './AnchorLink'

import styles from './NextSection.module.sass'

interface Props {
  to: string
  id: string
  target: RefObject<HTMLDivElement>
}

export const NextSection = ({ to, target, id }: Props) => (
  <div className={styles.svgIcon}>
    <AnchorLink to={to} id={id} target={target}>
      <svg width={100} height={100}>
        <title>Go to next section</title>
        <use xlinkHref="ikonate.svg#chevron-down" />
      </svg>
    </AnchorLink>
  </div>
)
