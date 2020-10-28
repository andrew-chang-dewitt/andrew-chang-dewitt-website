import React from 'react'

import WebAddressIcon from './WebAddressIcon'
import GitHubIcon from './GitHubIcon'
import ExternalLink from '../ExternalLink'

import sharedStyles from './Shared.module.sass'
import styles from './Experience.module.sass'

interface Item {
  title: string
  url?: Link
  repo: Link
  'more-info': Link
  stack: Stack
  summary: Array<string>
}

interface Link {
  href: string
  display: string
}

type Stack = SingleStack | MultiStack
type SingleStack = Array<string>
type MultiStack = {
  'front-end': SingleStack
  'back-end': SingleStack
}
const isMultiStack = (stack: Stack): stack is MultiStack =>
  stack.hasOwnProperty('front-end')

interface Props {
  data: Array<Item>
}

const renderStackList = (stack: SingleStack) =>
  stack.map((tech) => <li key={tech}>{tech}</li>)

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

        {isMultiStack(experienceItem.stack) ? (
          <>
            <p>Front end: </p>
            <ul>{renderStackList(experienceItem.stack['front-end'])}</ul>

            <p>Back end: </p>
            <ul>{renderStackList(experienceItem.stack['back-end'])}</ul>
          </>
        ) : (
          <ul>{renderStackList(experienceItem.stack)}</ul>
        )}

        <ul>
          {experienceItem.summary.map((item) => (
            <li key={item}>{item}</li>
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
