// import React, { MutableRefObject } from 'react'
import { expect } from 'chai'
import 'mocha'
// import { shallow, configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import sinon from 'sinon'

// configure({ adapter: new Adapter() })

import utils from './utils'

describe('getElementPosition()', () => {
  it('fetches the number of pixels from the top of a given HTMLElement to the top of the viewport', () => {
    // mock out the element, it's not what's being tested here
    const element = {
      getBoundingClientRect: () => {
        return {
          top: 10,
        }
      },
    } as HTMLElement

    expect(utils.getElementPosition(element)).to.equal(10)
  })

  it('can do the same for an HTMLDivElement', () => {
    // mock out the element, it's not what's being tested here
    const element = {
      getBoundingClientRect: () => {
        return {
          top: 10,
        }
      },
    } as HTMLDivElement

    expect(utils.getElementPosition(element)).to.equal(10)
  })

  it('returns a position of 0 if the element is null', () => {
    const element = null

    expect(utils.getElementPosition(element)).to.equal(0)
  })
})
