import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Header } from './Header'

describe('component/navigation/NavMenu', () => {
  const header = shallow(<Header></Header>)

  it('should render a list of menu items', () => {
    expect(header.children()).to.have.lengthOf(3)
  })
})
