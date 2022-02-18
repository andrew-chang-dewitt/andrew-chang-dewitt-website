import React from 'react'

import sharedStyles from './Shared.module.sass'
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
      {item.degree} in {item.major}
      {item.minor ? (
        <>
          , <span className="italic">minor in {item.minor}</span>
        </>
      ) : (
        ''
      )}
    </h3>
    <div className={sharedStyles.twoColumnLayout}>
      <div className={styles.left}>
        <h4>{item.school}</h4>
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
