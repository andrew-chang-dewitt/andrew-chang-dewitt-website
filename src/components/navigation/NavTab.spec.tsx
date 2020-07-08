import { expect } from 'chai'
import 'mocha'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import sinon from 'sinon'

import React from 'react'
// import * as router from '@reach/router'

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
  }
}

describe('component/navigation/NavTab', () => {
  // //
  // // Mocking @reach/router's Location behavior
  // //
  // // function for mocking a Location
  // const mockLocation = (path: string, hash: string) => {
  //   return ({
  //     hash: hash,
  //     pathname: path,
  //     search: '',
  //   } as any) as router.WindowLocation
  // }
  // // keep stub in describe scope so it can be modified by each test
  // let useLocationStub: any

  // beforeEach(() => {
  //   //
  //   // stubbing Router behavior
  //   //

  //   // stubbing gatsby's internal Link implementation
  //   // solution from:
  //   // https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
  //   // using a type assertion on the global object allows adding properties
  //   // to the object without typescript complaining. Hacky, but since this is
  //   // to get a test to work without the gatsby environment, it's fine
  //   ;(global as any).__BASE_PATH__ = ''

  //   // Location listener
  //   // assigned to stub in describe block scope to make it available
  //   // in each test
  //   useLocationStub = sinon.stub(router, 'useLocation')
  // })

  // afterEach(() => {
  //   useLocationStub.restore()
  // })

  it('knows if it is an "active" tab', () => {
    const active = Factories.NavTab.createActive()

    expect(active.hasClass('active')).to.be.true
  })

  it('or an "inactive" tab', () => {
    const inactive = Factories.NavTab.create()

    expect(inactive.hasClass('active')).to.be.false
  })

  // it('clicking on a tab should remove focus from the tab', () => {
  //   const tab = Factories.NavTab.create()

  //   tab.simulate('click')

  //   expect(tab.matchesElement((global as any).document.activeElement)).to.be
  //     .false
  // })

  // it("clicking on a tab should put focus on the tab's target content area", () => {})
})
