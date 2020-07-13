import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Header } from './Header'
// import { NavMenu, MenuItem } from '../navigation/NavMenu'
import { NavMenu } from '../navigation/NavMenu'

describe('component/header/Header', () => {
  // fake the type of navItems so it'll be accepted by Header
  // without having to know the implementation details of MenuItem
  // const navItems = [('a navigation item' as any) as MenuItem]
  const navItems = [{ to: '', text: '', key: '' }]

  const header = shallow(<Header navigationItems={navItems}></Header>)

  it('should have a branding section', () => {
    expect(header.find('#branding')).to.have.lengthOf(1)
  })

  it('should render a NavMenu', () => {
    expect(header.find(NavMenu)).to.have.lengthOf(1)
  })
})
