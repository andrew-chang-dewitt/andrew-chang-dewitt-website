import 'mocha'
import { expect } from 'chai'
import { render, cleanup, within } from '@testing-library/react'

import React from 'react'

import { Experience, Item } from './Experience'

const setup = (item: Item) => render(<Experience data={[item]} />)
const anItem: Item = {
  title: 'title',
  repo: {
    href: 'href',
    display: 'display',
  },
  stack: ['stack'],
  description: 'description',
}

describe('component/resume/Experience', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Links', () => {
    it('All Experience items have a project repo', () => {
      const { getByText } = setup({
        ...anItem,
        repo: {
          display: 'repo',
          href: '/repo/location',
        },
      })

      expect(getByText('repo')).to.exist
    })

    it('Some Experience items also have a project url', () => {
      const { getByText } = setup({
        ...anItem,
        url: {
          display: 'url',
          href: '/url/location',
        },
      })

      expect(getByText('url')).to.exist
    })

    it('Some Experience items also have a more-info url', () => {
      const { getByText } = setup({
        ...anItem,
        moreInfo: {
          display: 'a link',
          href: '/to/more/info',
        },
      })

      expect(getByText('a link')).to.exist
    })
  })

  describe('Description', () => {
    it('A single experience item contains a Description', () => {
      const { getByTitle } = setup(anItem)

      expect(getByTitle('Description')).to.exist
    })

    it("Renders the Item's description", () => {
      const { getByTitle } = setup({
        ...anItem,
        description: 'A description here.',
      })

      const description = getByTitle('Description')

      expect(within(description).getByText(/a description here/i))
    })

    it('Can parse a description that contains a markdown-style link: [display](href)', () => {
      const { getByText } = setup({
        ...anItem,
        description: 'regular text & [a link](/to/some/location)',
      })

      const descriptionItem = getByText(/regular text/i)

      expect(
        within(descriptionItem)
          .getByText(/a link/i)
          .attributes.getNamedItem('href')?.value
      ).to.equal('/to/some/location')
    })

    it("Can't parse a description item that contains multiple links", () => {
      const descriptionItems =
        'regular text & [a link](/to/some/location) & [another link](/to/some/location)'

      expect(() =>
        setup({
          ...anItem,
          description: descriptionItems,
        })
      ).to.throw('There can only be one link in a Description item.')
    })
  })
})
