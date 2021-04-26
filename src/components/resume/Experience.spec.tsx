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
  summary: ['summary'],
}

describe('component/resume/Experience', () => {
  afterEach(() => {
    cleanup()
  })

  describe('summary list', () => {
    it('An single experience item contains a Summary list', () => {
      const { getByTitle } = setup(anItem)

      expect(getByTitle('Summary')).to.exist
    })

    it('Displays a list containing each string given as Item.summary', () => {
      const { getByTitle } = setup({
        ...anItem,
        summary: [
          'first summary item',
          'second summary item',
          'third summary item',
        ],
      })

      const summary = getByTitle('Summary')

      expect(within(summary).getByText(/first summary item/i)) &&
        expect(within(summary).getByText(/second summary item/i)) &&
        expect(within(summary).getByText(/third summary item/i))
    })

    it('Can parse a summary item that contains a markdown-style link: [display](href)', () => {
      const { getByText } = setup({
        ...anItem,
        summary: ['regular text & [a link](/to/some/location)'],
      })

      const summaryItem = getByText(/regular text/i)

      expect(
        within(summaryItem)
          .getByText(/a link/i)
          .attributes.getNamedItem('href')?.value
      ).to.equal('/to/some/location')
    })

    it("Can't parse a summary item that contains multiple links", () => {
      const summaryItems = [
        'regular text & [a link](/to/some/location) & [another link](/to/some/location)',
      ]

      expect(() =>
        setup({
          ...anItem,
          summary: summaryItems,
        })
      ).to.throw('There can only be one link in a Summary item.')
    })
  })
})
