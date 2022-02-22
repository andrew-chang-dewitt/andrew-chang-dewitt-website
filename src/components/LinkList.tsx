import React from 'react'

import ExternalLink from './ExternalLink'
import WebAddressIcon from './icons/WebAddressIcon'
import GitHubIcon from './icons/GitHubIcon'
import MoreInfoIcon from './icons/MoreInfoIcon'
import LinkType from '../LinkType'

interface LinkListProps {
  repo: LinkType | Array<LinkType>
  url?: LinkType
  moreInfo?: LinkType
}

const isSingleRepo = (repo: LinkType | Array<LinkType>): repo is LinkType =>
  repo.hasOwnProperty('href')

const Repo = ({ data }: { data: LinkType }) => (
  <li>
    <GitHubIcon />

    <ExternalLink href={data.href}>{data.display}</ExternalLink>
  </li>
)

export default ({ repo, url, moreInfo }: LinkListProps) => (
  <>
    {url ? (
      <li>
        <WebAddressIcon />

        <ExternalLink href={url.href}>{url.display}</ExternalLink>
      </li>
    ) : null}

    {isSingleRepo(repo) ? (
      <Repo data={repo} />
    ) : (
      repo.map((repo, index) => <Repo data={repo} key={`${index}`} />)
    )}

    {moreInfo ? (
      <li>
        <MoreInfoIcon />

        <ExternalLink href={moreInfo.href}>{moreInfo.display}</ExternalLink>
      </li>
    ) : null}
  </>
)
