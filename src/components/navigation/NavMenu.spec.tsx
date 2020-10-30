import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'
import { NavTab } from './NavTab'

describe('component/navigation/NavMenu', () => {
  describe('rendering Props', () => {
    const items: MenuItem[] = [
      { text: 'Text1', to: '/#1', key: '1' },
      { text: 'Text2', to: '/#2', key: '2' },
      { text: 'Text3', to: '/#3', key: '3' },
    ]
    const menu = shallow(<NavMenu items={items} />)

    it('should render a list of menu items from props as NavTab components', () => {
      expect(menu.find(NavTab)).to.have.lengthOf(3)
    })

    it('when on a smaller screen the menu starts as closed', () => {
      expect(menu.find('ul').hasClass('opened')).to.be.false
    })

    it('but can be toggled open', () => {
      menu.childAt(0).childAt(0).shallow().simulate('click')
      expect(menu.find('ul').hasClass('opened')).to.be.true
    })
  })
})
