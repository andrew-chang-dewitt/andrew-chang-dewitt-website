import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Landing } from './Landing'

describe('components/Landing', () => {
  const landing = shallow(<Landing />)

  it('should have a landing section', () => {
    expect(landing.find('#landing')).to.have.lengthOf(1)
  })
})
