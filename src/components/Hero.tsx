import React, { FunctionComponent } from 'react'

import styles from './Hero.module.sass'

interface Props {
  title: string
  id: string
  color?: Colors
}

export enum Colors {
  Dark = '#373F42',
  Light = '#F7F4F0',
  Blue = '#308695',
  Red = '#D45769',
}

const colorStyles = (selection: Colors) => {
  let color: Colors

  if (selection === Colors.Light) {
    color = Colors.Dark
  } else {
    color = Colors.Light
  }

  return {
    backgroundColor: selection,
    color: color,
  }
}

export const Hero: FunctionComponent<Props> = ({
  title,
  id,
  color = Colors.Dark,
  children,
}) => (
  <section id={id} className={styles.hero} style={colorStyles(color)}>
    <div className="standardWidth">
      <h1 className={`${styles.title} title`}>{title}</h1>
    </div>
    {children}
  </section>
)
