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
  // keep stub in describe scope so it can be modified by each test
  let useLocationStub: any
  // function for mocking a Location
  const mockLocation = ({ hash = '', path = '' }) => {
    const mock = ({
      hash: hash,
      pathname: path,
    } as any) as router.WindowLocation

    useLocationStub.returns(mock)
  }

  beforeEach(() => {
    //
    // mocking Rputerbehaviour
    //
    // mocking gatsby's internal Link implementation
    // solution from
    // https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
    // using a type assertion on the global object allows adding properties
    // to the object without typescript complaining. Hacky, but since this is
    // to get a test to work without the gatsby environment, it's fine
    ;(global as any).__BASE_PATH__ = ''

    // Location listener
    // assigned to stub in describe block scope to make it available
    // in each test
    useLocationStub = sinon.stub(router, 'useLocation')
  })

  afterEach(() => {
    useLocationStub.restore()
  })

  it('should render a list of menu items', () => {
    const items: MenuItem[] = [
      { text: 'Text1', to: '/#destination1', key: '1' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({})
    const menu = shallow(<NavMenu items={items} />)

    expect(menu.children()).to.have.lengthOf(3)
  })

  it('can set the active tab based on the path on page load', () => {
    const items: MenuItem[] = [
      { text: 'Blog', to: '/blog', key: 'blog' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ path: '/blog' })
    const menuPathActive = shallow(<NavMenu items={items} />)

    expect(menuPathActive.childAt(0).shallow().hasClass('active')).to.be.true
    expect(menuPathActive.childAt(1).shallow().hasClass('active')).to.be.false
    expect(menuPathActive.childAt(2).shallow().hasClass('active')).to.be.false
  })

  it('can set the active tab based on the hash on page load', () => {
    const items: MenuItem[] = [
      { text: 'Blog', to: '/#blog', key: 'blog' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ hash: '#blog' })
    const menuPathActive = shallow(<NavMenu items={items} />)

    expect(menuPathActive.childAt(0).shallow().hasClass('active')).to.be.true
    expect(menuPathActive.childAt(1).shallow().hasClass('active')).to.be.false
    expect(menuPathActive.childAt(2).shallow().hasClass('active')).to.be.false
  })

  // it('can update the active tab when the user navigates to a new location', () => {
  //   const items: MenuItem[] = [
  //     { text: 'First Location', to: '/#first-location', key: '1' },
  //     { text: 'Second Location', to: '/#second-location', key: '2' },
  //     { text: 'Text3', to: '/#destination3', key: '3' },
  //   ]
  //   mockLocation({ hash: '#first-location' })
  //   const menu = shallow(<NavMenu items={items} />)

  //   console.log('before:', menu.state())
  //   // user clicks on 'Second Location' navigation item
  //   menu.childAt(1).simulate('click')
  //   console.log('after:', menu.state())

  //   expect(menu.childAt(1).shallow().hasClass('active')).to.be.true
  //   expect(menu.childAt(0).shallow().hasClass('active')).to.be.false
  // })
})
