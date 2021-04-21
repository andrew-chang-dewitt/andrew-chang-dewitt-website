import React from 'react'

import styles from './Education.module.sass'

export interface EducationItem {
  school: string
  date: string
  location: string
  degree: string
  minor: string
}

interface Props {
  data: Array<EducationItem>
}

const buildEducationItem = (item: EducationItem) => (
  <div className="avoidPageBreak" key={item.degree}>
    <h3>
      {item.degree}, <span className="italic">minor in {item.minor}</span>
    </h3>
    <div className={styles.twoColumnLayout}>
      <div className={`subtitle ${styles.degree}`}>
        <h4>{item.school}</h4>
      </div>

      <ul className={styles.info}>
        <li>{item.location}</li>
        <li>Expected graduation: {item.date}</li>
      </ul>
    </div>
  </div>
)

export const Education = ({ data }: Props) => (
  <section className={`avoidPageBreak ${styles.education}`}>
    <h2 className="title">Education</h2>
    {data.map(buildEducationItem)}
  </section>
)
