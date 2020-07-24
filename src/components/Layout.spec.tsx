import React, { MutableRefObject } from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

import { Layout, mergeRefsToItems } from './Layout'
// star import to allow stubbing functions
import utils from '../utils'
import { Landing } from './pages/Landing'
import { Header } from './header/Header'
import { AnchorLink } from './navigation/AnchorLink'

describe('component/Layout', () => {
  const navItems = [
    {
      to: '/#first',
      text: 'First',
      key: 'first',
    },
    {
      to: '/#second',
      text: 'Second',
      key: 'second',
    },
  ]
  describe('#content', () => {
    const children = (
      <div>
        <div className="child">This is a child</div>
        <div className="child">Another child</div>
      </div>
    )
    const content = shallow(
      <Layout navigationItems={navItems}>{children}</Layout>
    )

    it('renders child elements', () => {
      expect(content.find('div.child')).to.have.lengthOf(2)
    })

    it('allows users to skip to main content', () => {
      // test run against AnchorLink's to property since Layout doesn't know about
      // AnchorLink's internal implementation
      expect(content.find(AnchorLink).props().to).to.equal('#main-content')
    })

    it('defaults to not rendering a page title in the content section', () => {
      expect(content.find('#main-content').first().children().first().is('h1'))
        .to.be.false
    })

    it('but can be told to render a given page title as the first node in the content section', () => {
      const title = shallow(
        <Layout navigationItems={navItems} pageTitle="Test">
          {children}
        </Layout>
      )
        .find('#main-content')
        .first()
        .children()
        .first()

      console.log(title.html())
      expect(title.is('h1')).to.be.true
      expect(title.props().children).to.equal('Test')
    })
  })

  describe('#landing', () => {
    const layout = shallow(<Layout navigationItems={navItems} landing></Layout>)

    it('optionally renders a Landing', () => {
      expect(layout.find(Landing)).to.have.lengthOf(1)
    })

    it('and that landing is before the Header', () => {
      expect(layout.childAt(1).type()).to.equal(Landing)
      expect(layout.childAt(3).type()).to.equal(Header)
    })
  })

  describe('#header', () => {
    const layout = shallow(<Layout navigationItems={navItems} landing />)

    it('navigation configuration is defined in Layout as an array of MenuItems', () => {
      expect(layout.find(Header).get(0).props.navigationItems).to.eql(navItems)
    })

    it("can match React Refs to navigation items by the item's key value", () => {
      const refs = {
        first: ('actually a ref' as any) as MutableRefObject<any>,
      }

      expect(mergeRefsToItems(navItems, refs)[0].targetRef).to.exist
      expect(mergeRefsToItems(navItems, refs)[1].targetRef).to.not.exist
    })

    it('sets brandingVisibility to false if header position is > 0', () => {
      layout.setState({ headerPosition: 1 })

      expect(layout.find(Header).first().props().brandingVisibility).to.be.false
    })

    it('sets brandingVisibility to true if header position is == 0', () => {
      layout.setState({ headerPosition: 0 })

      expect(layout.find(Header).first().props().brandingVisibility).to.be.true
    })

    describe('scroll behavior', () => {
      const windowScrollListener = sinon.spy(window, 'addEventListener')

      const scrollTest = shallow(<Layout navigationItems={navItems}></Layout>)

      // manually invoke mounting because Enzyme won't
      // https://stackoverflow.com/a/46513933
      // must be guarded as componenet did mount is not
      // guarnteed to exist on ShallowWrapper.instance()
      // https://stackoverflow.com/a/52706587
      const instance = scrollTest.instance() as Layout

      it('tracks header position using a scroll event listener', () => {
        const mount = instance.componentDidMount
        if (mount) mount()

        expect(
          windowScrollListener.calledWith('scroll', instance.scrollListener)
        )
      })

      it('uses callback to update header position on scroll', () => {
        const getElPosStub = sinon.stub(utils, 'getElementPosition').returns(1)
        instance.scrollListener()

        expect(scrollTest.state('headerPosition')).to.equal(1)

        getElPosStub.restore()
      })
    })
  })
})
