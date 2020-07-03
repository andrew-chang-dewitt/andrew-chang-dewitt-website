import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'

describe('component/navigation/NavMenu', () => {
  const setup = (path: string = '/path', hash: string = '') => {
    //
    // mocking Rputerbehaviour
    //
    // mocking gatsby's internal Link implementation
    // solution from https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
    // using a type assertion on the global object allows adding properties
    // to the object without typescript complaining. Hacky, but since this is
    // to get a test to work without the gatsby environment, it's fine
    ;(global as any).__BASE_PATH__ = ''

    // Location
    const mockLocation = ({
      hash: hash,
      pathname: path,
    } as any) as router.WindowLocation

    // Location listener
    sinon.stub(router, 'useLocation').returns(mockLocation)
  }
  const teardown = () => {
    sinon.restore()
  }

  after(() => {
    teardown()
  })

  const items: MenuItem[] = [
    { text: 'Text', to: '/#destination', key: '1' },
    { text: 'Text', to: '/#destination', key: '2' },
    { text: 'Text', to: '/#destination', key: '3' },
  ]

  it('should render a list of menu items', () => {
    setup()
    const menu = shallow(<NavMenu items={items} />)

    expect(menu.children()).to.have.lengthOf(3)
  })

  it('can set the active tab for path changes, like `/blog`', () => {})

  it('and for hash changes, like `/#hash`', () => {})
})
