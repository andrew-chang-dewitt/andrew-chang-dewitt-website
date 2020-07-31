import React from 'react'

import { NextSection } from './navigation/NextSection'
import { MenuItem } from './navigation/NavMenu'

import styles from './Section.module.sass'

// adding children property on Props interface per
// https://stackoverflow.com/a/54677641
interface Props extends React.ComponentPropsWithoutRef<'section'> {
  id: string
  title?: string
  next?: MenuItem
}

export const Section = React.forwardRef<HTMLDivElement, Props>(
  ({ id, title, next, children }, ref) => (
    <section className={styles.container} ref={ref} id={id} tabIndex={-1}>
      {title ? <h1 className={`${styles.title} title`}>{title}</h1> : ''}
      <div className={`${styles.contents} contents`}>{children}</div>
      {next && next.targetRef ? (
        <div className={styles.nextSection}>
          <NextSection to={next.to} id={next.key} target={next.targetRef} />
        </div>
      ) : (
        ''
      )}
    </section>
  )
)
