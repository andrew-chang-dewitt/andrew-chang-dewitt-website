import React, { FunctionComponent } from 'react'

import styles from './Hero.module.sass'

interface Props {
  id: string
  title?: string | null
  className?: string | null
  color?: Colors
}

export enum Colors {
  Dark = '#373F42',
  Light = '#F7F4F0',
  Blue = '#308695',
  Red = '#D45769',
}

export const colorStyles = (selection: Colors) => {
  return {
    backgroundColor: selection,
    color: selection === Colors.Light ? Colors.Dark : Colors.Light,
  }
}

export const Hero: FunctionComponent<Props> = ({
  id,
  title = null,
  className = null,
  color = Colors.Dark,
  children,
}) => (
  <section
    id={id}
    className={`${styles.hero} ${className ? className : ''}`}
    style={colorStyles(color)}
  >
    <div>
      {title ? (
        <div className="standardWidth">
          <h1 className={`${styles.title} title`}>{title}</h1>
        </div>
      ) : null}

      {children}
    </div>
  </section>
)
