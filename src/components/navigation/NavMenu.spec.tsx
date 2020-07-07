import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { NavMenu, MenuItem } from './NavMenu'

describe('component/navigation/NavMenu', () => {
  // keep stub in describe scope so it can be modified by each test
  let useLocationStub: any
  // function for mocking a Location
  const mockLocation = ({ hash = '', path = '' }) => {
    const mock = ({
      hash: hash,
      pathname: path,
    } as any) as router.WindowLocation

    useLocationStub.returns(mock)
  }

  beforeEach(() => {
    //
    // mocking Router behavior
    //

    // mocking gatsby's internal Link implementation
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

  it('should render a list of menu items', () => {
    const items: MenuItem[] = [
      { text: 'Text1', to: '/#destination1', key: '1' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({})
    const menu = shallow(<NavMenu items={items} />)

    expect(menu.children()).to.have.lengthOf(3)
  })

  it('can set the active tab based on only the first path level on page load', () => {
    const items: MenuItem[] = [
      { text: 'Blog', to: '/blog/post/1', key: 'blog' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ path: '/blog/post/1' })
    const menuPathActive = shallow(<NavMenu items={items} />)

    expect(menuPathActive.childAt(0).shallow().hasClass('active')).to.be.true
    expect(menuPathActive.childAt(1).shallow().hasClass('active')).to.be.false
    expect(menuPathActive.childAt(2).shallow().hasClass('active')).to.be.false
  })

  it('can set the active tab based on the path on page load', () => {
    const items: MenuItem[] = [
      { text: 'Blog', to: '/blog', key: 'blog' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ path: '/blog' })
    const menuPathActive = shallow(<NavMenu items={items} />)

    expect(menuPathActive.childAt(0).shallow().hasClass('active')).to.be.true
    expect(menuPathActive.childAt(1).shallow().hasClass('active')).to.be.false
    expect(menuPathActive.childAt(2).shallow().hasClass('active')).to.be.false
  })

  it('can set the active tab based on the hash on page load', () => {
    const items: MenuItem[] = [
      { text: 'Blog', to: '/#blog', key: 'blog' },
      { text: 'Text2', to: '/#destination2', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ hash: '#blog' })
    const menuPathActive = shallow(<NavMenu items={items} />)

    expect(menuPathActive.childAt(0).shallow().hasClass('active')).to.be.true
    expect(menuPathActive.childAt(1).shallow().hasClass('active')).to.be.false
    expect(menuPathActive.childAt(2).shallow().hasClass('active')).to.be.false
  })

  it('can update the active tab when the user navigates to a new location', () => {
    const items: MenuItem[] = [
      { text: 'First Location', to: '/#first-location', key: '1' },
      { text: 'Second Location', to: '/#second-location', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    mockLocation({ hash: '#first-location', path: '/' })
    const menu = shallow(<NavMenu items={items} />)

    console.log(menu.html())
    mockLocation({ hash: '#second-location', path: '/' })
    const second = menu.childAt(1).shallow()

    expect(second.hasClass('active')).to.be.true
    // expect(second.simulate('click').hasClass('active')).to.be.true
    // expect(first.hasClass('active')).to.be.false
  })
})

describe('testing with LocationProvider', () => {
  it('can update the active tab when the user navigates to a new location', () => {
    const items: MenuItem[] = [
      { text: 'First Location', to: '/#first-location', key: '1' },
      { text: 'Second Location', to: '/#second-location', key: '2' },
      { text: 'Text3', to: '/#destination3', key: '3' },
    ]
    // FIXME: createMemorySource doesn't support hashes in location
    // see github issue: https://github.com/reach/router/issues/25
    // might be able to write my own suuuuuuper basic source that respects hashes to
    // allow to be used for mocking these things better
    let source = router.createMemorySource('/path/#first-location')
    const history = router.createHistory(source)
    const menu = shallow(
      <router.LocationProvider history={history}>
        <NavMenu items={items} />
      </router.LocationProvider>
    )
    console.log(menu.html())

    expect(menu.childAt(0).hasClass('active')).to.be.true
    // console.log(menu.html())
    // const second = menu.childAt(1).shallow()

    // expect(second.hasClass('active')).to.be.true
    // expect(second.simulate('click').hasClass('active')).to.be.true
    // expect(first.hasClass('active')).to.be.false
  })
})

// Stores history entries in memory for testing or other platforms like Native
const createBetterSource = (initialPath = '/') => {
  const searchIndex = initialPath.indexOf('?')
  const hashIndex = initialPath.indexOf('#')
  const initialLocation = {
    pathname:
      searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : '',
  }
  let index = 0
  const stack = [initialLocation]
  const states = [null]

  return {
    get location() {
      return stack[index]
    },
    addEventListener(name: string, fn: () => any) {
      console.log(name, 'added')
      fn()
    },
    removeEventListener(name: string, fn: () => any) {
      console.log(name, 'removed')
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
        const [pathname, search = ''] = uri.split('?')
        index++
        stack.push({ pathname, search: search.length ? `?${search}` : search })
        states.push(state)
      },
      replaceState(state: any, _: any, uri: string) {
        const [pathname, search = ''] = uri.split('?')
        stack[index] = { pathname, search }
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
