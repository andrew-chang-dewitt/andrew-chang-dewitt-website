import React from 'react'

import styles from './Education.module.sass'

export interface EducationItem {
  school: string
  date: string
  location: string
  degree: string
  major: string
  minor?: string
}

interface Props {
  data: Array<EducationItem>
}

const buildEducationItem = (item: EducationItem) => (
  <div className="avoidPageBreak" key={item.school}>
    <h3>
      {item.major}, <span className="italic">{item.degree}</span>
    </h3>
    { item.minor 
        ? <h4 className="subtitle">minor in {item.minor}</h4>
        : "" }
    <div className={styles.twoColumnLayout}>
      <div className={styles.left}>
        <h5>{item.school}</h5>
      </div>

      <ul className={styles.right}>
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
