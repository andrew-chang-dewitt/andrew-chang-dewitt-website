import React from 'react'
import { Link } from 'gatsby'

import RoundedItemList from '../RoundedItemList'
import ExternalLink from '../ExternalLink'
import WebAddressIcon from '../icons/WebAddressIcon'
import GitHubIcon from '../icons/GitHubIcon'
import LinkType from '../../LinkType'

import sharedStyles from './Shared.module.sass'
import styles from './Experience.module.sass'

export interface Item {
  title: string
  url?: LinkType
  repo: LinkType
  'more-info'?: LinkType
  stack: Array<string>
  summary: Array<string>
}

interface Props {
  data: Array<Item>
}

const parseSummaryItem = (item: string): Array<React.ReactNode> => {
  const strings = item.split('[')

  if (strings.length > 2)
    throw RangeError('There can only be one link in a Summary item.')

  if (strings.length === 2) {
    strings.splice(1, 1, ...strings[1].split(')'))
    strings.splice(1, 1, ...strings[1].split(']('))

    const link = <ExternalLink href={strings[2]}>{strings[1]}</ExternalLink>
    const nodes = strings as Array<React.ReactNode>
    nodes.splice(1, 2, link)

    return nodes
  } else return strings
}

export const Experience = ({ data }: Props) => (
  <section className={styles.experience}>
    <h2 className="title">Experience</h2>

    {data.map((experienceItem) => (
      <div className="avoidPageBreak" key={experienceItem.title}>
        <h3 className="title">{experienceItem.title}</h3>

        <div className={styles.twoColumnLayout}>
          <div>
            <ul className={sharedStyles.infoList}>
              {experienceItem.url ? (
                <li>
                  <WebAddressIcon />

                  <ExternalLink href={experienceItem.url.href}>
                    {experienceItem.url.display}
                  </ExternalLink>
                </li>
              ) : null}

              <li>
                <GitHubIcon />

                <ExternalLink href={experienceItem.repo.href}>
                  {experienceItem.repo.display}
                </ExternalLink>
              </li>
            </ul>

            <RoundedItemList
              items={experienceItem.stack}
              accessibleName="stack"
            />
          </div>

          <ul title="Summary">
            {experienceItem.summary.map((item) => (
              <li key={item}>{parseSummaryItem(item)}</li>
            ))}

            {experienceItem['more-info'] ? (
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
