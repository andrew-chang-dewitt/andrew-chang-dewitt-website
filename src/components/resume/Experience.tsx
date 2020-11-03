import React from 'react'

import RoundedItemList from '../RoundedItemList'
import ExternalLink from '../ExternalLink'
import WebAddressIcon from '../icons/WebAddressIcon'
import GitHubIcon from '../icons/GitHubIcon'

import sharedStyles from './Shared.module.sass'
import styles from './Experience.module.sass'

interface Item {
  title: string
  url?: Link
  repo: Link
  'more-info': Link
  stack: Array<string>
  summary: Array<string>
}

interface Link {
  href: string
  display: string
}

interface Props {
  data: Array<Item>
}

const parseSummaryItem = (item: string): Array<React.ReactNode> => {
  const strings = item.split('[')

  if (strings.length > 1) {
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
      <div key={experienceItem.title}>
        <h3 className="title">{experienceItem.title}</h3>

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

        <RoundedItemList items={experienceItem.stack} accessibleName="stack"/>

        <ul>
          {experienceItem.summary.map((item) => (
            <li key={item}>{parseSummaryItem(item)}</li>
          ))}

          <li>
            More info:{' '}
            <ExternalLink href={`https://${experienceItem['more-info'].href}`}>
              {experienceItem['more-info'].display}
            </ExternalLink>
          </li>
        </ul>
      </div>
    ))}
  </section>
)
