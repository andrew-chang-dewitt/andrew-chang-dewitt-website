import React from 'react'

interface Props {
  href: string
}

const ExternalLink: React.FunctionComponent<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export default ExternalLink
