import { expect } from 'chai'
import 'mocha'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import sinon from 'sinon'

import React, { MutableRefObject } from 'react'
import { Link } from 'gatsby'
// import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { NavTab as ActualNavTab } from './NavTab'
import { AnchorLink } from './AnchorLink'

namespace Factories {
  export class NavTab {
    static create() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
      }

      return shallow(
        <ActualNavTab text={item.text} to={item.to} id={item.key} />
      )
    }

    static createActive() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
        active: true,
      }

      return shallow(
        <ActualNavTab
          text={item.text}
          to={item.to}
          id={item.key}
          active={item.active}
        />
      )
    }

    static createAnchor() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
      }

      const ref = ('a value' as any) as MutableRefObject<any>

      return shallow(
        <ActualNavTab
          text={item.text}
          to={item.to}
          id={item.key}
          contentTarget={ref}
        />
      )
    }

    static createAnchorActive() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
        active: true,
      }

      const ref = ('a value' as any) as MutableRefObject<any>

      return shallow(
        <ActualNavTab
          text={item.text}
          to={item.to}
          id={item.key}
          contentTarget={ref}
        />
      )
    }
  }
}

describe('component/navigation/NavTab', () => {
  it('knows if it is an "active" tab', () => {
    const active = Factories.NavTab.createActive()

    expect(active.hasClass('active')).to.be.true
  })

  it('or an "inactive" tab', () => {
    const inactive = Factories.NavTab.create()

    expect(inactive.hasClass('active')).to.be.false
  })

  it('when contentTarget prop is not given, NavTab renders a Link', () => {
    const anchor = Factories.NavTab.create()

    expect(anchor.find(Link)).to.have.lengthOf(1)
  })

  it('when given a Ref via contentTarget, NavTab renders an AnchorLink', () => {
    const anchor = Factories.NavTab.createAnchor()

    expect(anchor.find(AnchorLink)).to.have.lengthOf(1)
  })

  it('and the rendered AnchorLink can also be marked as active, just like a normal NavTab', () => {
    const anchor = Factories.NavTab.createAnchor()

    expect(anchor.find(AnchorLink)).to.have.lengthOf(1)
  })
})
