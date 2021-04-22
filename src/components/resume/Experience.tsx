import React from 'react'
import { Link } from 'gatsby'

import LinkList, { LinkType } from '../LinkList'
import RoundedItemList from '../RoundedItemList'
import ExternalLink from '../ExternalLink'

import sharedStyles from './Shared.module.sass'
import styles from './Experience.module.sass'

interface Item {
  title: string
  url?: LinkType
  repo: LinkType | Array<LinkType>
  'more-info': LinkType
  stack: Array<string>
  summary: Array<string>
}

interface ExperienceProps {
  data: Array<Item>
}

const parseSummaryItem = (item: string): string => {
  const strings = item.split('[')

  if (strings.length > 1) {
    strings.splice(1, 1, ...strings[1].split(')'))
    strings.splice(1, 1, ...strings[1].split(']('))

    const link = <ExternalLink href={strings[2]}>{strings[1]}</ExternalLink>
    const nodes = strings as Array<React.ReactNode>
    nodes.splice(1, 2, link)

    return nodes.join('')
  } else return strings.join('')
}

export const Experience = ({ data }: ExperienceProps) => (
  <section className={styles.experience}>
    <h2 className="title">Experience</h2>

    {data.map((experienceItem) => (
      <div className="avoidPageBreak" key={experienceItem.title}>
        <h3 className="title">{experienceItem.title}</h3>

        <div className={styles.twoColumnLayout}>
          <div>
            <ul className={sharedStyles.infoList}>
              <LinkList url={experienceItem.url} repo={experienceItem.repo} />
            </ul>

            <RoundedItemList
              items={experienceItem.stack}
              accessibleName="stack"
            />
          </div>

          <ul>
            {experienceItem.summary.map((item) => (
              <li key={item}>{parseSummaryItem(item)}</li>
            ))}

            {experienceItem.hasOwnProperty('more-info') ? (
              <li>
                More info:{' '}
                <Link to={experienceItem['more-info'].href}>
                  {experienceItem['more-info'].display}
                </Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    ))}
  </section>
)
