import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Layout } from './Layout'

describe('component/Layout', () => {
  describe('#content', () => {
    const children = (
      <div>
        <div className="child">This is a child</div>
        <div className="child">Another child</div>
      </div>
    )
    const content = shallow(<Layout pageTitle="Test">{children}</Layout>)

    it('renders child elements', () => {
      expect(content.find('div.child')).to.have.lengthOf(2)
    })
  })
})
