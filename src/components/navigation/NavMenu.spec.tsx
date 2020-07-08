import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'
import { NavTab } from './\NavTab'

describe('component/navigation/NavMenu', () => {
  //
  // Mocking @reach/router's Location behavior
  //
  // function for mocking a Location
  const mockLocation = (path: string, hash: string) => {
    return ({
      hash: hash,
      pathname: path,
      search: '',
    } as any) as router.WindowLocation
  }

  describe('rendering Props', () => {
    // keep stub in describe scope so it can be modified by each test
    let useLocationStub: any

    beforeEach(() => {
      //
      // stubbing Router behavior
      //

      // stubbing gatsby's internal Link implementation
      // solution from:
      // https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
      // using a type assertion on the global object allows adding properties
      // to the object without typescript complaining. Hacky, but since this is
      // to get a test to work without the gatsby environment, it's fine
      ;(global as any).__BASE_PATH__ = ''

      // Location listener
      // assigned to stub in describe block scope to make it available
      // in each test
      useLocationStub = sinon.stub(router, 'useLocation')
    })

    afterEach(() => {
      useLocationStub.restore()
    })

    it('should render a list of menu items from props as NavTab components', () => {
      const items: MenuItem[] = [
        { text: 'Text1', to: '/#1', key: '1' },
        { text: 'Text2', to: '/#2', key: '2' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      useLocationStub.returns(mockLocation('/', '#1'))
      const menu = shallow(<NavMenu items={items} />)

      expect(menu.find(NavTab)).to.have.lengthOf(3)
    })
  })

  describe("@reach/router's WindowLocation based navigation functionality", () => {
    beforeEach(() => {
      // gatsby's internal Link implementation relies on a global __BASE_PATH__ variable
      // solution from:
      // https://mariusschulz.com/blog/declaring-global-variables-in-typescript#using-a-type-assertion
      // using a type assertion on the global object allows adding properties
      // to the object without typescript complaining. Hacky, but since this is
      // to get a test to work without the gatsby environment, it's fine
      ;(global as any).__BASE_PATH__ = ''
    })
    afterEach(() => {
      // cleanup global namespace
      delete (global as any).__BASE_PATH__
    })

    // Stores history entries in memory for testing or other platforms like Native
    const createBetterSource = (initialPath = '/') => {
      const hashIndex = initialPath.indexOf('#')
      const pathname =
        hashIndex > -1 ? initialPath.substr(0, hashIndex) : initialPath
      const hash = hashIndex > -1 ? initialPath.substr(hashIndex) : ''
      const initialLocation = mockLocation(pathname, hash)
      let index = 0
      const stack = [initialLocation]
      const states = [null]

      return {
        get location() {
          return stack[index]
        },
        addEventListener(_: string, fn: any) {
          fn()
        },
        removeEventListener(_: string, fn: any) {
          fn()
        },
        history: {
          get entries() {
            return stack
          },
          get index() {
            return index
          },
          get state() {
            return states[index]
          },
          pushState(state: any, _: any, uri: string) {
            const [pathname, hash = ''] = uri.split('#')
            index++
            stack.push(mockLocation(pathname, hash.length ? `#${hash}` : hash))
            states.push(state)
          },
          replaceState(state: any, _: any, uri: string) {
            const [pathname, hash = ''] = uri.split('#')
            stack[index] = mockLocation(
              pathname,
              hash.length ? `#${hash}` : hash
            )
            states[index] = state
          },
          go(to: number) {
            const newIndex = index + to

            if (newIndex < 0 || newIndex > states.length - 1) {
              return
            }

            index = newIndex
          },
        },
      }
    }

    it('can set the active tab based on only the first path level on page load', () => {
      const items: MenuItem[] = [
        { text: 'Blog', to: '/first', key: 'first' },
        { text: 'Text2', to: '/#second', key: 'second' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      let source = createBetterSource('/first/post/1')
      const history = router.createHistory(source)

      // because items is passed by reference to NavMenu, the instance above will
      // be modified anytime NavMenu's internal state updates;
      // the shallow-rendered component does not need to be tested directly, instead
      // the test can be against the data itself
      shallow(
        <router.LocationProvider history={history}>
          <NavMenu items={items} />
        </router.LocationProvider>
      ).html() // found if the instance of ShallowWrapper is not interacted w/ by
      // calling one of it's methods, then it's internal calls to useState
      // don't seem to be executed

      expect(items[0].active).to.be.true
      expect(items[1].active).to.be.false
      expect(items[2].active).to.be.false
    })

    it('can set the active tab based on the hash on page load', () => {
      const items: MenuItem[] = [
        { text: 'Blog', to: '/first', key: 'first' },
        { text: 'Text2', to: '/#second', key: 'second' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      let source = createBetterSource('/#second')
      const history = router.createHistory(source)

      shallow(
        <router.LocationProvider history={history}>
          <NavMenu items={items} />
        </router.LocationProvider>
      ).html()

      expect(items[0].active).to.be.false
      expect(items[1].active).to.be.true
      expect(items[2].active).to.be.false
    })

    it('only sets the active item for hashes on the root path', () => {
      const items: MenuItem[] = [
        { text: 'Blog', to: '/first', key: 'first' },
        { text: 'Text2', to: '/#second', key: 'second' },
        { text: 'Text3', to: '/this#wont-match', key: 'wont-match' },
      ]
      let source = createBetterSource('/this#wont-match')
      const history = router.createHistory(source)

      shallow(
        <router.LocationProvider history={history}>
          <NavMenu items={items} />
        </router.LocationProvider>
      ).html()

      expect(items[0].active).to.be.false
      expect(items[1].active).to.be.false
      expect(items[2].active).to.be.false
    })

    it('can update the active tab when the user navigates to a new location', () => {
      const items: MenuItem[] = [
        { text: 'Blog', to: '/first', key: 'first' },
        { text: 'Text2', to: '/#second', key: 'second' },
        { text: 'Text3', to: '/#3', key: '3' },
      ]
      let source = createBetterSource('/first')
      const history = router.createHistory(source)

      // shallow render before the navigation event to trigger the first modification
      // of the items array
      shallow(
        <router.LocationProvider history={history}>
          <NavMenu items={items} />
        </router.LocationProvider>
      ).html()
      // then, simulate a navigation event by calling the history object's navigate method
      // this is what is done under the hood in Reach Router
      history.navigate('/#second')
      // lastly, shallow render again after the navigation event, as it would trigger
      // a re-render in a full environment
      shallow(
        <router.LocationProvider history={history}>
          <NavMenu items={items} />
        </router.LocationProvider>
      ).html()

      expect(items[0].active).to.be.false
      expect(items[1].active).to.be.true
    })
  })
})
