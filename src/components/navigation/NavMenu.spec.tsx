import React from 'react'
import { expect } from 'chai'
import 'mocha'
import {
  //mount,
  shallow,
  configure,
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import sinon from 'sinon'

// import testUtils from '../../testUtils'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'
import { NavTab } from './\NavTab'

// import * as router from '@reach/router'

describe('component/navigation/NavMenu', () => {
  describe('rendering Props', () => {
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

    it('should render a list of menu items from props as NavTab components', () => {
      const items: MenuItem[] = [
        { text: 'Text1', to: '/#1', key: '1' },
        { text: 'Text2', to: '/#2', key: '2' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      // useLocationStub.returns(testUtils.mockLocation('/', '#1'))
      const menu = shallow(<NavMenu items={items} />)

      expect(menu.find(NavTab)).to.have.lengthOf(3)
    })
  })

  // describe("@reach/router's WindowLocation based navigation functionality", () => {
  //   beforeEach(() => {
  //     // gatsby's internal Link implementation relies on a global __BASE_PATH__ variable
  //     // solution from:
  //     // https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
  //     // using a type assertion on the global object allows adding properties
  //     // to the object without typescript complaining. Hacky, but since this is
  //     // to get a test to work without the gatsby environment, it's fine
  //     ;(global as any).__BASE_PATH__ = ''
  //     // solution to `ReferenceError: __loader is not defined` from
  //     // https://github.com/gatsbyjs/gatsby/issues/6240#issuecomment-408627563
  //     ;(global as any).___loader = {
  //       enqueue: sinon.fake(),
  //     }
  //   })
  //   afterEach(() => {
  //     // cleanup global namespace
  //     delete (global as any).__loader
  //   })

  //   it('can set the active tab based on only the first path level on page load', () => {
  //     const items: MenuItem[] = [
  //       { text: 'Blog', to: '/first', key: 'first' },
  //       { text: 'Text2', to: '/#second', key: 'second' },
  //       { text: 'Text3', to: '/#3', key: '3' },
  //     ]
  //     let source = testUtils.createBetterSource('/first/post/1')
  //     const history = router.createHistory(source)

  //     // because items is passed by reference to NavMenu, the instance above will
  //     // be modified anytime NavMenu's internal state updates;
  //     // the shallow-rendered component does not need to be tested directly, instead
  //     // the test can be against the data itself
  //     shallow(
  //       <router.LocationProvider history={history}>
  //         <NavMenu items={items} />
  //       </router.LocationProvider>
  //     ).html() // found if the instance of ShallowWrapper is not interacted w/ by
  //     // calling one of it's methods, then it's internal calls to useState
  //     // don't seem to be executed

  //     expect(items[0].active).to.be.true
  //     expect(items[1].active).to.be.false
  //     expect(items[2].active).to.be.false
  //   })

  //   it('can set the active tab based on the hash on page load', () => {
  //     const items: MenuItem[] = [
  //       { text: 'Blog', to: '/first', key: 'first' },
  //       { text: 'Text2', to: '/#second', key: 'second' },
  //       { text: 'Text3', to: '/#3', key: '3' },
  //     ]
  //     let source = testUtils.createBetterSource('/#second')
  //     const history = router.createHistory(source)

  //     shallow(
  //       <router.LocationProvider history={history}>
  //         <NavMenu items={items} />
  //       </router.LocationProvider>
  //     ).html()

  //     expect(items[0].active).to.be.false
  //     expect(items[1].active).to.be.true
  //     expect(items[2].active).to.be.false
  //   })

  //   it('only sets the active item for hashes on the root path', () => {
  //     const items: MenuItem[] = [
  //       { text: 'Blog', to: '/first', key: 'first' },
  //       { text: 'Text2', to: '/#second', key: 'second' },
  //       { text: 'Text3', to: '/this#wont-match', key: 'wont-match' },
  //     ]
  //     let source = testUtils.createBetterSource('/this#wont-match')
  //     const history = router.createHistory(source)

  //     shallow(
  //       <router.LocationProvider history={history}>
  //         <NavMenu items={items} />
  //       </router.LocationProvider>
  //     ).html()

  //     expect(items[0].active).to.be.false
  //     expect(items[1].active).to.be.false
  //     expect(items[2].active).to.be.false
  //   })

  //   it('can update an item as active when the location changes', () => {
  //     const items: MenuItem[] = [
  //       { text: 'Blog', to: '/first', key: 'first' },
  //       { text: 'Text2', to: '/#second', key: 'second' },
  //       { text: 'Text3', to: '/#3', key: '3' },
  //     ]
  //     const source = testUtils.createBetterSource('/first')
  //     const history = router.createHistory(source)

  //     // using mount here to get full access to events & to render the children as well
  //     const menu = mount(
  //       <router.LocationProvider history={history}>
  //         {/* this element's just to simplify mocking a navigation event
  //          * so that we don't have to know what the internal shape of
  //          * NavMenu is like to click an element inside it
  //          * */}
  //         <button
  //           onClick={(_: React.MouseEvent) => {
  //             history.navigate('/#second')
  //           }}
  //         >
  //           go to second
  //         </button>
  //         <NavMenu items={items} />
  //       </router.LocationProvider>
  //     )

  //     menu.childAt(0).simulate('click')

  //     // wrap expect assertion in a timeout so that there's time for React's
  //     // async call to useEffect
  //     setTimeout(() => {
  //       expect(menu.childAt(1).props().items[1].active).to.be.true
  //     }, 100)
  //   })
  // })
})
