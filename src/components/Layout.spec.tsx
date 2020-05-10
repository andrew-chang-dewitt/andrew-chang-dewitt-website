import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Layout } from './Layout'

describe('component/Layout', () => {
  const layout = shallow(<Layout pageTitle="" />)
  it('has a header section', () => {
    expect(layout.find('div.layout-header')).to.have.lengthOf(1)
  })

  it('and a content section', () => {
    expect(layout.find('div.layout-content')).to.have.lengthOf(1)
  })

  describe('#header', () => {
    const header = shallow(<Layout pageTitle="A Page Title" />).find(
      'div.layout-header'
    )
    it('always displays the site title', () => {
      expect(header.text()).to.have.string('Hello:')
    })

    it('followed by a dynamically rendered page title', () => {
      expect(header.find('span.layout-pageTitle').text()).to.equal(
        'A Page Title'
      )
    })
  })

  describe('#content', () => {
    const children = (
      <div>
        <div className="child">This is a child</div>
        <div className="child">Another child</div>
      </div>
    )
    const content = shallow(<Layout pageTitle="">{children}</Layout>)

    it('renders child elements', () => {
      expect(content.find('div.child')).to.have.lengthOf(2)
    })
  })
})
