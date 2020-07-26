import React, { RefObject } from 'react'

import { AnchorLink } from './AnchorLink'

interface Props {
  to: string
  id: string
  target: RefObject<HTMLDivElement>
}

export const NextSection = ({ to, target, id }: Props) => (
  <AnchorLink to={to} id={id} target={target}>
    <svg>
      <title>Go to next section</title>
      <use xlinkHref="ikonate.svg#chevron-down" />
    </svg>
  </AnchorLink>
)
