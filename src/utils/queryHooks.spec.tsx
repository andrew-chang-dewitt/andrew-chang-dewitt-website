import 'mocha'
import { expect, use } from 'chai'
import { default as chaiDom } from 'chai-dom'
// import sinon, { SinonStub } from 'sinon'
import {
  render,
  // RenderResult,
  screen,
  act,
  fireEvent,
  cleanup,
} from '@testing-library/react'

// configure chai to use chai-dom plugin
use(chaiDom)

import React from 'react'
// import * as router from '@reach/router'
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router'

import { useQueryParam } from './queryHooks'

describe('utils/queryHooks', function () {
  describe('useQueryParam()', function () {
    const inputEvent = (element: HTMLInputElement, newValue: string) => {
      act(() => {
        fireEvent.change(element, { target: { value: newValue } })
      })
    }

    const TestComponent = ({ defaultValue }: { defaultValue?: string[] }) => {
      const { value, update } = defaultValue
        ? useQueryParam('test', defaultValue)
        : useQueryParam('test')

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        update([event.target.value])
      }

      return (
        <div>
          <span role="queryValue">{JSON.stringify(value)}</span>
          <input role="updateValue" value={value} onChange={handleChange} />
        </div>
      )
    }

    const setup = (startingPath: string = '/') => {
      // set up a fake location to test against with a query
      const history = createHistory(createMemorySource(startingPath))
      // render with location using manually created history
      act(() => {
        render(
          <LocationProvider history={history}>
            <TestComponent />
          </LocationProvider>
        )
      })

      return {
        value: screen.getByRole('queryValue'),
        input: screen.getByRole('updateValue') as HTMLInputElement,
      }
    }

    afterEach(() => {
      cleanup()
    })

    it('returns the value(s) of a given URI search query parameter', function () {
      const { value } = setup('/?test=value')

      expect(value).to.have.text(JSON.stringify(['value']))
    })

    it('can update query values', function () {
      const { value, input } = setup('/?test=value')

      inputEvent(input, 'newValue')

      expect(value).to.have.text(JSON.stringify(['newValue']))
    })

    it("returns a given default value if the query doesn't exist", () => {
      const history = createHistory(createMemorySource('/'))

      act(() => {
        render(
          <LocationProvider history={history}>
            <TestComponent defaultValue={['default']} />
          </LocationProvider>
        )
      })

      const value = screen.getByRole('queryValue')

      expect(value).to.have.text(JSON.stringify(['default']))
    })

    it("but it returns an empty string if a default value isn't given", () => {
      const history = createHistory(createMemorySource('/'))

      act(() => {
        render(
          <LocationProvider history={history}>
            <TestComponent />
          </LocationProvider>
        )
      })

      const value = screen.getByRole('queryValue')

      expect(value).to.have.text(JSON.stringify(['']))
    })
  })
})
