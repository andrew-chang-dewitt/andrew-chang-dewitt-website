import React from 'react'

import styles from './Education.module.sass'

interface EducationItem {
  school: string
  start: number
  end: number
  location: string
  description?: string
}

interface Props {
  data: Array<EducationItem>
}

export const Education = ({ data }: Props) => (
  <section className={`avoidPageBreak ${styles.education}`}>
    <h2 className="title">Education</h2>
    {data.map((item) => (
      <div key={item.school}>
        <h3>{item.school}</h3>
        <p className="subtitle">
          {item.start} - {item.end}, {item.location}
        </p>
        {item.description ? (
          <p className="subtitle">{item.description}</p>
        ) : null}
      </div>
    ))}
  </section>
)
