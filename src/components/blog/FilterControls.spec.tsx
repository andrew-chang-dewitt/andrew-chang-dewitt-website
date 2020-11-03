import 'mocha'
import { expect, use } from 'chai'
import ChaiDom from 'chai-dom'
use(ChaiDom)
import sinon from 'sinon'
import { render, screen, act, fireEvent, cleanup } from '@testing-library/react'

import React from 'react'
import {
  LocationProvider,
  createHistory,
  createMemorySource,
} from '@reach/router'

import { FilterControls } from './FilterControls'

// import queryHooks from '../../utils/queryHooks'

// useQueryParamStub = sinon.stub(queryHooks, 'useQueryParam')
// useQueryParamStub.returns({ value: [1], update: (value: any[]) => value })

describe('component/FilterControls', function () {
  const sortHandler = sinon.spy()
  const setup = () => {
    const history = createHistory(createMemorySource('/'))

    const rendered = render(
      <LocationProvider history={history}>
        <FilterControls tags={['a tag']} sortHandler={sortHandler} />
      </LocationProvider>
    )

    return { rendered, displayToggle: screen.getByTitle(/filter & sort/i) }
  }

  before(() => {
    // mock out global properties that Gatsby's Link requires to not throw errors
    Object.defineProperty(global, '__BASE_PATH__', {
      value: '',
      writable: true,
    })
    Object.defineProperty(global, '___loader', {
      value: {
        enqueue: () => {},
      },
      writable: true,
    })
  })
  afterEach(() => {
    cleanup()
  })

  it('initially displays as a single button', async function () {
    setup()
    const buttons = await screen.findAllByRole('button')

    expect(buttons).to.have.lengthOf(1)
  })

  it('that toggles displaying two other buttons when clicked', async function () {
    const { displayToggle } = setup()

    act(() => {
      fireEvent.click(displayToggle)
    })

    const buttons = await screen.findAllByRole('button')

    expect(buttons).to.have.lengthOf(3)
  })

  it('one of the newly displayed buttons opens a list of tags to filter the posts by', async function () {
    const { displayToggle } = setup()

    act(() => {
      fireEvent.click(displayToggle)
    })

    const filterToggle = screen.getByTitle(/filter by tag/i)

    act(() => {
      fireEvent.click(filterToggle)
    })

    const tags = await screen.findByText(/a tag/i)

    expect(tags).to.exist
  })

  it('and the other calls the given sort direction handler', async function () {
    const { displayToggle } = setup()

    act(() => {
      fireEvent.click(displayToggle)
    })

    const sortToggle = await screen.findByTitle(/sort by/i)

    act(() => {
      fireEvent.click(sortToggle)
    })

    expect(sortHandler.calledOnce).to.be.true
  })

  it('defaults to a descending sort direction', async function () {
    const { displayToggle } = setup()

    act(() => {
      fireEvent.click(displayToggle)
    })

    const sortToggle = await screen.findByTitle(/sort by/i)

    expect(sortToggle).to.have.text('Sort by date: Descending')
  })

  it('can be told to be ascending instead', async function () {
    const history = createHistory(createMemorySource('/'))

    render(
      <LocationProvider history={history}>
        <FilterControls
          tags={['a tag']}
          sortHandler={sortHandler}
          sortAscending
        />
      </LocationProvider>
    )

    const displayToggle = screen.getByTitle(/filter & sort/i)

    act(() => {
      fireEvent.click(displayToggle)
    })

    const sortToggle = await screen.findByTitle(/sort by/i)

    expect(sortToggle).to.have.text('Sort by date: Ascending')
  })

  it('can indicate a currently active tag in the filter by tag choices', async function () {
    const history = createHistory(createMemorySource('/'))

    render(
      <LocationProvider history={history}>
        <FilterControls
          tags={['a tag']}
          sortHandler={sortHandler}
          currentTag="a tag"
        />
      </LocationProvider>
    )

    const displayToggle = screen.getByTitle(/filter & sort/i)

    act(() => {
      fireEvent.click(displayToggle)
    })

    const filterToggle = screen.getByTitle(/filter by tag/i)

    act(() => {
      fireEvent.click(filterToggle)
    })

    const tags = await screen.findByText(/a tag/i)

    expect(tags).to.have.class('currentTag')
  })

  it('and it gives an option for viewing all posts if currently filtering by a tag', async function () {
    const history = createHistory(createMemorySource('/'))

    render(
      <LocationProvider history={history}>
        <FilterControls
          tags={['a tag']}
          sortHandler={sortHandler}
          currentTag="a tag"
        />
      </LocationProvider>
    )

    const displayToggle = screen.getByTitle(/filter & sort/i)

    act(() => {
      fireEvent.click(displayToggle)
    })

    const filterToggle = screen.getByTitle(/filter by tag/i)

    act(() => {
      fireEvent.click(filterToggle)
    })

    const allPosts = await screen.findByText(/all posts/i)

    expect(allPosts).to.exist
  })

  it("but the all posts option isn't given if already viewing all posts", async function () {
    const { displayToggle } = setup()

    act(() => {
      fireEvent.click(displayToggle)
    })

    const filterToggle = screen.getByTitle(/filter by tag/i)

    act(() => {
      fireEvent.click(filterToggle)
    })

    const allPosts = await (async () => {
      try {
        return await screen.findByText(/all posts/i)
      } catch (e) {
        return e
      }
    })()

    // all posts link should be an error because the text match won't be found
    expect(allPosts).to.be.an.instanceOf(Error)
  })

  it('renders a spacer between tags in the list if there are more than 1 tag', async function () {
    const history = createHistory(createMemorySource('/'))

    render(
      <LocationProvider history={history}>
        <FilterControls
          tags={['a tag', 'another tag']}
          sortHandler={sortHandler}
        />
      </LocationProvider>
    )

    const displayToggle = screen.getByTitle(/filter & sort/i)

    act(() => {
      fireEvent.click(displayToggle)
    })

    const filterToggle = screen.getByTitle(/filter by tag/i)

    act(() => {
      fireEvent.click(filterToggle)
    })

    const spacers = await screen.findAllByText('|')

    // there should be three spacers, two between the buttons & one between the tags
    expect(spacers).to.have.lengthOf(3)
  })
})
