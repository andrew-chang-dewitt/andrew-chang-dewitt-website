import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// import { NavMenu as ActualNavMenu } from './NavMenu'
import { NavMenu } from './NavMenu'

describe('component/navigation/NavMenu', () => {
  const childOne = <div className="test">Item 1</div>
  const childTwo = <div>Item 2</div>
  const menu = shallow(
    <NavMenu>
      {childOne}
      {childTwo}
      Some Text
    </NavMenu>
  )

  it('should render a list of menu items', () => {
    expect(menu.children()).to.have.lengthOf(3)
  })
})
