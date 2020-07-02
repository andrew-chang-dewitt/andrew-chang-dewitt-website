import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { NavTab as ActualNavTab } from './NavTab'

namespace Factories {
  export class NavTab {
    static create() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
      }

      return shallow(<ActualNavTab item={item} />)
    }

    static createActive() {
      const item = {
        text: 'Inactive tab',
        to: 'destination',
        key: '1',
        active: true,
      }

      return shallow(<ActualNavTab item={item} />)
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

  //   it('receives an onClick handler as a prop', () => {
  //     const link = Factories.NavTab.create()
  //   })
})
