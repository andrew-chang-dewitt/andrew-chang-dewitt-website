import React from 'react'

import styles from './WebAddressIcon.module.sass'

interface Props {
  className?: string
}

export default ({ className = '' }: Props) => (
  <svg className={`${styles.icon} ${className}`}>
    <title>More info</title>
    <use xlinkHref="icons/ikonate.svg#info" />
  </svg>
)
