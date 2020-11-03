import React from 'react'

import GitHubIcon from '../icons/GitHubIcon'
import WebAddressIcon from '../icons/WebAddressIcon'
import ExternalLink from '../ExternalLink'

import styles from './Header.module.sass'
import sharedStyles from './Shared.module.sass'

interface Props {
  data: {
    name: string
    phone: string
    email: string
    website: string
    github: string
  }
}

const formatPhoneNumber = (phone: string): string =>
  phone
    .split('')
    .map((current, index) => {
      switch (index) {
        // surround area code in parenthesis
        case 0:
          return `(${current}`
        case 2:
          return `${current}) `

        // separate local code with hyphen
        case 5:
          return `${current}-`

        default:
          return current
      }
    })
    .join('')

export const Header = ({ data }: Props) => (
  <section className={`avoidPageBreak ${styles.header}`}>
    <h1 className="title">{data.name}</h1>
    <ul className={sharedStyles.infoList}>
      <li className="stroke">
        <svg className={sharedStyles.stroke}>
          <title>Phone number:</title>
          <use xlinkHref="/icons/ikonate.svg#phone"></use>
        </svg>

        <a href={`tel:+01-${data.phone}`}>{formatPhoneNumber(data.phone)}</a>
      </li>

      <li className="stroke">
        <svg className={sharedStyles.stroke}>
          <title>Email address:</title>
          <use xlinkHref="/icons/ikonate.svg#envelope"></use>
        </svg>

        <a href={`mailto:${data.email}`}>{data.email}</a>
      </li>

      <li>
        <WebAddressIcon />
        <ExternalLink href={`https://${data.website}`}>
          {data.website}
        </ExternalLink>
      </li>

      <li>
        <GitHubIcon />

        <ExternalLink href={`https://${data.github}`}>
          {data.github}
        </ExternalLink>
      </li>
    </ul>
  </section>
)
