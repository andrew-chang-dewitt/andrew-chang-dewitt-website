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

    const TestComponent = () => {
      const { value, update } = useQueryParam('test')

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
      // use RenderHook to monitor a query param w/ key of 'test'
      act(() => {
        render(
          <LocationProvider history={history}>
            <TestComponent />
          </LocationProvider>
        )
      })
      const value = screen.getByRole('queryValue')
      const input = screen.getByRole('updateValue') as HTMLInputElement

      return { value, input }
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
  })
})
