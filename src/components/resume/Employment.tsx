import React from 'react'

import RoundedItemList from '../RoundedItemList'

import sharedStyles from './Shared.module.sass'
import styles from './Employment.module.sass'

interface Item {
  title: string
  positions: Array<Position>
  summary: Array<string>
  skills: Array<string>
}

interface Position {
  'job-title': string
  employer: string
  start: string
  end: string
}

interface Props {
  data: Array<Item>
}

export const Employment = ({ data }: Props) => (
  <section className={styles.employment}>
    <h2 className="title">Experience</h2>

    {data.map((employmentItem) => (
      <div
        className={`${styles.item} avoidPageBreak`}
        key={employmentItem.title}
      >
        <h3 className="title">{employmentItem.positions[0].employer}</h3>

        <RoundedItemList
          items={employmentItem.skills}
          accessibleName="skills"
        />

        <div className={sharedStyles.twoColumnLayout}>
          <ul className={styles.positions}>
            {employmentItem.positions.map((position) => (
              <li key={position.start} className="subtitle">
                <h4>{position['job-title']}</h4>
                <p>
                  {employmentItem.positions.length > 1
                    ? position.employer + ', '
                    : ''}
                  {position.start} - {position.end}
                </p>
              </li>
            ))}
          </ul>

          <ul>
            {employmentItem.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </section>
)
