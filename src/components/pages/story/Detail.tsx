import React from 'react'

import styles from './Detail.module.sass'

interface Props {
  buttonText: string
  additionalText?: string
}

export const Detail: React.FunctionComponent<Props> = ({
  buttonText,
  additionalText,
  children,
}) => {
  const [expanded, setExpanded] = React.useState(false)
  const expandTitle = 'read more about this'
  const collapseTitle = 'collapse extra details'

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const keyHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        toggleExpanded()
    }
    e.preventDefault()
  }

  return (
    <span>
      <span
        className={styles.button}
        onClick={toggleExpanded}
        onKeyPress={keyHandler}
        title={expanded ? collapseTitle : expandTitle}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        {buttonText}
      </span>
      {additionalText ? additionalText : ''}
      <span className={styles.extraDetail}>{expanded ? children : ''}</span>
    </span>
  )
}
