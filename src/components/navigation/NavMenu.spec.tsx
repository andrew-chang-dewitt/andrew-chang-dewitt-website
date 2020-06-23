import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// import { NavMenu as ActualNavMenu } from './NavMenu'
import { NavMenu } from './NavMenu'

// before(() => {
//   global.__PATH_PREFIX__ = ``
// })

describe('component/navigation/NavMenu', () => {
  const items = [<div>Text</div>, <div>Text</div>, <div>Text</div>]
  const menu = shallow(<NavMenu>{items}</NavMenu>)

  console.log(menu.html())

  it('should render a list of menu items', () => {
    expect(menu.children()).to.have.lengthOf(3)
  })
})
