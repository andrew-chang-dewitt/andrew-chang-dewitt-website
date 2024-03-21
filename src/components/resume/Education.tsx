import React from 'react'

import sharedStyles from './Shared.module.sass'
import styles from './Education.module.sass'

export interface EducationItem {
  school: string
  date?: string
  location: string
  degree?: string
  major: string
  minor?: string
  gpa?: string
  description: string
}

interface Props {
  data: Array<EducationItem>
}

const buildEducationItem = (item: EducationItem) => (
  <div className="avoidPageBreak" key={item.school}>
    <h3>
      {item.school}, {item.location}
    </h3>
    <div className={sharedStyles.twoColumnLayout}>
      <div className={styles.left}>
        <h4>
          {item.degree ? <>{item.degree}, </> : <>''</>}
          {item.major}
          {item.minor ? (
            <>
              , <span className="italic">minor in {item.minor}</span>
            </>
          ) : (
            ''
          )}
        </h4>
        <ul>
          {item.date ? <li className="italic">{item.date}</li> : null}
          {item.gpa ? <li className="italic">GPA: {item.gpa}</li> : null}
        </ul>
      </div>

      <div className={styles.right}>{item.description}</div>
    </div>
  </div>
)

export const Education = ({ data }: Props) => (
  <section className={`avoidPageBreak ${styles.education}`}>
    <h2 className="title">Education</h2>
    {data.map(buildEducationItem)}
  </section>
)
