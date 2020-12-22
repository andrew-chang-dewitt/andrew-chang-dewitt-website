import 'mocha'
import { expect } from 'chai'
import { render, screen, cleanup } from '@testing-library/react'

import React from 'react'

import LinkList, { LinkType } from './LinkList'

describe('component/LinkList', () => {
  afterEach(() => {
    cleanup()
  })

  describe('project url', () => {
    const setup = (url?: LinkType) => render(<LinkList url={url} repo={[]} />)

    it('renders a link to the given url', () => {
      setup({
        href: '/to/location',
        display: 'display',
      })

      expect(
        screen.getByText('display').attributes.getNamedItem('href')?.value
      ).to.equal('/to/location')
    })

    it('renders a "www" icon', () => {
      setup({
        href: '/to/location',
        display: 'display',
      })

      expect(screen.getByText('www')).to.exist
    })

    it("doesn't have to be included", () => {
      setup()

      expect(() => screen.getByRole('link')).to.throw(/unable to find/i)
    })
  })

  describe('repo url', () => {
    const setup = (repo: LinkType | Array<LinkType>) =>
      render(<LinkList repo={repo} />)

    it('renders a link to a given url', () => {
      setup({
        href: '/to/location',
        display: 'display',
      })

      expect(
        screen.getByText('display').attributes.getNamedItem('href')?.value
      ).to.equal('/to/location')
    })

    it('renders a GitHub icon', () => {
      setup({
        href: '/to/location',
        display: 'display',
      })

      expect(screen.getByTitle('GitHub')).to.exist
    })

    it('can render multiple links', () => {
      setup([
        {
          href: '/to/location',
          display: 'display',
        },
        {
          href: '/to/location',
          display: 'display',
        },
      ])

      expect(screen.getAllByText('display')).to.have.lengthOf(2)
    })
  })
})
