import React from 'react'

import styles from './GitHubIcon.module.sass'

interface Props {
  className?: string
}

export default ({ className = '' }: Props) => (
  <svg className={`${styles.icon} ${className}`}>
    <title>GitHub</title>
    <use xlinkHref="/icons/icons8/sprite.min.svg#icon-github"></use>
  </svg>
)
