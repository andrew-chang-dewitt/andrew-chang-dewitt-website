import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Header } from './Header'

describe('component/header/Header', () => {
  const header = shallow(<Header></Header>)

  it('should render some children ---> placeholder test', () => {
    expect(header.children().length).to.be.greaterThan(0)
  })
})
