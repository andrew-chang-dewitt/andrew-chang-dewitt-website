import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'

// import * as gatsby from 'gatsby'

describe('component/navigation/NavMenu', () => {
  before(() => {
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
      hash: '',
      pathname: '/blog',
    } as any) as router.WindowLocation

    // Location listener
    sinon.stub(router, 'useLocation').returns(mockLocation)
  })
  after(() => {
    sinon.restore()
  })

  const items: MenuItem[] = [
    { text: 'Text', to: '/#destination', key: '1' },
    { text: 'Text', to: '/#destination', key: '2' },
    { text: 'Text', to: '/#destination', key: '3' },
  ]
  const menu = render(<NavMenu items={items} />)

  it('should render a list of menu items', () => {
    expect(menu.children()).to.have.lengthOf(3)
  })

  it('clicking on a tab should remove focus from the tab', () => {
    menu.children().find('#link-1')
  })

  it("clicking on a tab should put focus on the tab's target content area", () => {})
})
