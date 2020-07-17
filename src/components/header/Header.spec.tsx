import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Header } from './Header'
// import * as headerNamespace from './Header'
import { NavMenu, MenuItem } from '../navigation/NavMenu'

describe('component/header/Header', () => {
  // fake the type of navItems so it'll be accepted by Header
  // without having to know the implementation details of MenuItem
  const navItems = [('a navigation item' as any) as MenuItem]

  const header = shallow(<Header navigationItems={navItems}></Header>)

  it('should render a NavMenu', () => {
    expect(header.find(NavMenu)).to.have.lengthOf(1)
  })

  it('should have a branding section', () => {
    expect(header.find('#branding')).to.have.lengthOf(1)
  })

  it('should default to displaying the branding section', () => {
    expect(header.find('#branding').first().hasClass('hidden')).to.be.false
  })

  it('but can be told to hide the branding section', () => {
    const hidden = shallow(
      <Header navigationItems={navItems} brandingVisibility={false} />
    )
    expect(hidden.find('#branding').first().hasClass('hidden')).to.be.true
  })

  // describe('#branding section', () => {
  //   const mockLocation = (path: string, hash: string) => {
  //     return ({
  //       hash: hash,
  //       pathname: path,
  //       search: '',
  //     } as any) as router.WindowLocation
  //   }

  //   // Stores history entries in memory for testing or other platforms like Native
  //   const createBetterSource = (initialPath = '/') => {
  //     const hashIndex = initialPath.indexOf('#')
  //     const pathname =
  //       hashIndex > -1 ? initialPath.substr(0, hashIndex) : initialPath
  //     const hash = hashIndex > -1 ? initialPath.substr(hashIndex) : ''
  //     const initialLocation = mockLocation(pathname, hash)
  //     let index = 0
  //     const stack = [initialLocation]
  //     const states = [null]

  //     return {
  //       get location() {
  //         return stack[index]
  //       },
  //       addEventListener(_: string, fn: any) {
  //         fn()
  //       },
  //       removeEventListener(_: string, fn: any) {
  //         fn()
  //       },
  //       history: {
  //         get entries() {
  //           return stack
  //         },
  //         get index() {
  //           return index
  //         },
  //         get state() {
  //           return states[index]
  //         },
  //         pushState(state: any, _: any, uri: string) {
  //           const [pathname, hash = ''] = uri.split('#')
  //           index++
  //           stack.push(mockLocation(pathname, hash.length ? `#${hash}` : hash))
  //           states.push(state)
  //         },
  //         replaceState(state: any, _: any, uri: string) {
  //           const [pathname, hash = ''] = uri.split('#')
  //           stack[index] = mockLocation(
  //             pathname,
  //             hash.length ? `#${hash}` : hash
  //           )
  //           states[index] = state
  //         },
  //         go(to: number) {
  //           const newIndex = index + to

  //           if (newIndex < 0 || newIndex > states.length - 1) {
  //             return
  //           }

  //           index = newIndex
  //         },
  //       },
  //     }
  //   }

  //   // declare stubs for mocking in beforeEach
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
  //     // delete (global as any).__BASE_PATH__
  //     delete (global as any).__loader
  //   })

  //   // mock useState
  //   // const setStateSpy = sinon.spy()
  //   // const useStateStub: any = sinon.stub(React, 'useState')
  //   // useStateStub.callsFake((init: any) => [init, setStateSpy])

  //   // setup for mock Location
  //   let source = createBetterSource('/first/post/1')
  //   const history = router.createHistory(source)

  //   it('listens to window scroll events & cleans up the listener when unmounted', () => {
  //     // const windowScrollSpy = sinon.spy(window, 'addEventListener')
  //     // const windowUnmountScrollSpy = sinon.spy(window, 'removeEventListener')

  //     const scrollEventTest = mount(
  //       <router.LocationProvider history={history}>
  //         <div style={{ height: '100px' }}></div>
  //         <Header
  //           navigationItems={navItems}
  //           initialBrandingVisibility={false}
  //         />
  //       </router.LocationProvider>
  //     )

  //     // console.log(windowScrollSpy.args)
  //     // let scrollHandler = windowScrollSpy.args.reduce((result, value): any => {
  //     //   console.log('current iteration')
  //     //   console.log('result:', result, 'value:', value)
  //     //   if (result === null) {
  //     //     if (value[0] === 'scroll') return value[1]
  //     //     else return null
  //     //   } else return result
  //     // }, null)
  //     // console.log(scrollHandler)

  //     // expect(windowScrollSpy.calledWith('scroll')).to.be.true
  //     scrollEventTest.unmount()
  //     // expect(windowUnmountScrollSpy.calledWith('scroll')).to.be.true
  //   })

  //   it('hides branding area if header is not at top of viewport', () => {
  //     const windowAddEventStub = sinon.stub(window, 'addEventListener')
  //     let eventListeners: [string, EventListenerOrEventListenerObject][] = []
  //     const fakeAddEvent = (
  //       eventType: string,
  //       listener: EventListenerOrEventListenerObject
  //     ) => {
  //       eventListeners.push([eventType, listener])
  //     }
  //     windowAddEventStub.callsFake(fakeAddEvent)

  //     let scrollToValue = 100
  //     sinon.stub(window, 'pageYOffset').get(() => scrollToValue)

  //     console.log('mounting')
  //     const brandingVisibilityTest = mount(
  //       <router.LocationProvider history={history}>
  //         <Header
  //           navigationItems={navItems}
  //           initialBrandingVisibility={false}
  //         />
  //       </router.LocationProvider>
  //     )

  //     let scrollHandler = eventListeners.reduce((result, value): any => {
  //       if (result === null) {
  //         if (value[0] === 'scroll') return value[1]
  //         else return null
  //       } else return result
  //     }, null)

  //     const scrollEvent = (newScrollToValue: number) => {
  //       scrollToValue = newScrollToValue
  //       ;(scrollHandler as any)()
  //     }

  //     console.log(window.pageYOffset)
  //     console.log(scrollPosition)
  //     console.log(brandingVisibilityTest.find('#branding').hasClass('hidden'))
  //     console.log('\nsimulating scroll')
  //     scrollEvent(0)
  //     console.log(window.pageYOffset)
  //     console.log(scrollPosition)
  //     console.log('\nsimulating scroll')
  //     scrollEvent(50)
  //     console.log(window.pageYOffset)
  //     console.log(scrollPosition)
  //     console.log(brandingVisibilityTest.find('#branding').hasClass('hidden'))
  //   })
  // })
})
