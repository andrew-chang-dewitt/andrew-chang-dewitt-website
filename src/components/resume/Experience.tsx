import React from 'react'
// import { Link } from 'gatsby'

import RoundedItemList from '../RoundedItemList'
import ExternalLink from '../ExternalLink'
import LinkList from '../LinkList'
import LinkType from '../../LinkType'

import sharedStyles from './Shared.module.sass'
import styles from './Experience.module.sass'

export interface Item {
  title: string
  url?: LinkType
  repo: LinkType | Array<LinkType>
  moreInfo?: LinkType
  stack: Array<string>
  description: string
}

interface ExperienceProps {
  data: Array<Item>
}

const parseDescription = (item: string): Array<React.ReactNode> => {
  const strings = item.split('[')

  if (strings.length > 2)
    throw RangeError('There can only be one link in a Description item.')

  if (strings.length === 2) {
    strings.splice(1, 1, ...strings[1].split(')'))
    strings.splice(1, 1, ...strings[1].split(']('))

    const link = <ExternalLink href={strings[2]}>{strings[1]}</ExternalLink>
    const nodes = strings as Array<React.ReactNode>
    nodes.splice(1, 2, link)

    return nodes
  } else return strings
}

export const Experience = ({ data }: ExperienceProps) => (
  <section className={styles.experience}>
    <h2 className="title">Projects</h2>

    {data.map((experienceItem) => (
      <div
        className={`${styles.item} avoidPageBreak`}
        key={experienceItem.title}
      >
        <h3 className="title">{experienceItem.title}</h3>

        <RoundedItemList items={experienceItem.stack} accessibleName="Skills" />

        <div className={sharedStyles.twoColumnLayout}>
          <ul className={sharedStyles.infoList} aria-label="Links">
            <LinkList
              {...{
                repo: experienceItem.repo,
                url: experienceItem.url,
                moreInfo: experienceItem.moreInfo,
              }}
            />
          </ul>

          <div>
            <p title="Description" className={styles.description}>
              {parseDescription(experienceItem.description)}
            </p>
          </div>
        </div>
      </div>
    ))}
  </section>
)
