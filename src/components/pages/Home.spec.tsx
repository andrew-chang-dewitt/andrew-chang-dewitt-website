import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Home } from './Home'

describe('components/Home', () => {
  const home = shallow(<Home />)

  it('should have a landing section', () => {
    expect(home.find('#landing')).to.have.lengthOf(1)
  })
})
