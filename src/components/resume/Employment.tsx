import React from 'react'

import styles from './Employment.module.sass'

interface Item {
  title: string
  positions: Array<Position>
  summary: Array<string>
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
    <h2 className="title">Employment</h2>

    {data.map((employmentItem) => (
      <div className="avoidPageBreak" key={employmentItem.title}>
        <h3 className="title">{employmentItem.title}</h3>

        <div className={styles.twoColumnLayout}>
          <ul className={styles.positions}>
            {employmentItem.positions.map((position) => (
              <li key={position.start} className="subtitle">
                <h4 className="subtitle">{position['job-title']}</h4>
                <p>
                  {position.employer}, {position.start} - {position.end}
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
