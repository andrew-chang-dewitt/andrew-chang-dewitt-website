import React from 'react'

import styles from './WebAddressIcon.module.sass'

interface Props {
  className?: string
}

export default ({ className = '' }: Props) => (
  <span className={`${className} ${styles.www}`}> www</span>
)
