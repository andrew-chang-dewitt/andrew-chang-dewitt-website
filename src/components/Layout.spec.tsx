import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Layout } from './Layout'
import { Landing } from './pages/Landing'
import { Header } from './header/Header'

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

  describe('#landing & /#header', () => {
    const layout = shallow(<Layout pageTitle="Test" landing></Layout>)

    it('optionally renders a Landing', () => {
      expect(layout.find(Landing)).to.have.lengthOf(1)
    })

    it('and that landing is before the Header', () => {
      expect(layout.childAt(0).type()).to.equal(Landing)
      expect(layout.childAt(1).type()).to.equal(Header)
    })

    // it('', () => {})
  })
})
