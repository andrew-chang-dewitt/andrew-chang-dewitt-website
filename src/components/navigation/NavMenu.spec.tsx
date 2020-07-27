import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'
import { NavTab } from './\NavTab'

describe('component/navigation/NavMenu', () => {
  describe('rendering Props', () => {
    it('should render a list of menu items from props as NavTab components', () => {
      const items: MenuItem[] = [
        { text: 'Text1', to: '/#1', key: '1' },
        { text: 'Text2', to: '/#2', key: '2' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      const menu = shallow(<NavMenu items={items} />)

      expect(menu.find(NavTab)).to.have.lengthOf(3)
    })
  })
})
