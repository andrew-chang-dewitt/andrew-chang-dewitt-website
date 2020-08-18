import React, { RefObject, MutableRefObject } from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import { renderHook, act } from '@testing-library/react-hooks'
import Adapter from 'enzyme-adapter-react-16'
import sinon, { SinonSpy, SinonStub } from 'sinon'

configure({ adapter: new Adapter() })

import * as LayoutModule from './Layout'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'
import { AnchorLink } from './navigation/AnchorLink'
import { MenuItem } from './navigation/NavMenu'

import testUtils from '../testUtils'
import * as router from '@reach/router'

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
    {
      to: '/other-page',
      text: 'Other page',
      key: 'other-page',
    },
  ]

  let useLocationStub: SinonStub<any, any>

  describe('#content', () => {
    let content: ShallowWrapper
    let children: any

    beforeEach(() => {
      useLocationStub = sinon.stub(router, 'useLocation')
      useLocationStub.returns(testUtils.mockLocation('/', ''))

      children = (
        <div>
          <div className="child">This is a child</div>
          <div className="child">Another child</div>
        </div>
      )

      content = shallow(
        <LayoutModule.Layout navigationItems={navItems}>
          {children}
        </LayoutModule.Layout>
      )
    })
    afterEach(() => {
      useLocationStub.restore()
    })

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
        <LayoutModule.Layout navigationItems={navItems} pageTitle="Test">
          {children}
        </LayoutModule.Layout>
      )
        .find('#main-content')
        .first()
        .children()
        .first()

      expect(title.is('h1')).to.be.true
      expect(title.props().children).to.equal('Test')
    })
  })

  describe('#landing', () => {
    let layout: ShallowWrapper
    let children: any

    beforeEach(() => {
      useLocationStub = sinon.stub(router, 'useLocation')
      useLocationStub.returns(testUtils.mockLocation('/', ''))

      children = (
        <div>
          <div className="child">This is a child</div>
          <div className="child">Another child</div>
        </div>
      )

      layout = shallow(
        <LayoutModule.Layout navigationItems={navItems} landing>
          {children}
        </LayoutModule.Layout>
      )
    })
    afterEach(() => {
      useLocationStub.restore()
    })

    it('optionally renders a Landing', () => {
      expect(layout.find(Landing)).to.have.lengthOf(1)
    })

    it('and that landing is before the Header', () => {
      expect(layout.childAt(2).childAt(0).type()).to.equal(Landing)
      expect(layout.childAt(4).type()).to.equal(Header)
    })

    it('renders a Footer at the end of the page', () => {
      expect(layout.children().last().type()).to.equal(Footer)
    })
  })

  describe('#header', () => {
    describe('rendering', () => {
      let layout: ShallowWrapper

      beforeEach(() => {
        useLocationStub = sinon.stub(router, 'useLocation')
        useLocationStub.returns(testUtils.mockLocation('/', ''))

        layout = shallow(
          <LayoutModule.Layout navigationItems={navItems} landing />
        )
      })
      afterEach(() => {
        useLocationStub.restore()
      })

      it('navigation configuration is defined in Layout as an array of MenuItems', () => {
        expect(layout.find(Header).get(0).props.navigationItems).to.eql(
          navItems
        )
      })

      it("can match React Refs to navigation items by the item's key value", () => {
        const refs = {
          first: ('actually a ref' as any) as MutableRefObject<any>,
        }

        expect(LayoutModule.mergeRefsToItems(navItems, refs)[0].targetRef).to
          .exist
        expect(LayoutModule.mergeRefsToItems(navItems, refs)[1].targetRef).to
          .not.exist
      })
    })

    describe('scroll behavior', () => {
      // NEEDS IMPROVEMENT:
      // Most of these tests are really brittle due to the inability to
      // simulate scroll events with JSDOM for unit testing.
      // I haven't yet found a way to test the behavior better (versus the
      // implementation as these tests are run now) short of running full
      // integration tests using something like Cypress or Selenium
      describe('createIntersectionObserver()', () => {
        interface MockIntersectionObserver {
          restore: () => void
        }
        let observeSpy: SinonSpy
        let intersectionObserverSpy: SinonSpy
        let mockIntersectionObserver: MockIntersectionObserver
        // Mocking Intersection Observer behaviour
        const setupIntersectionObserverMock = (
          observe: SinonSpy | (() => null) = () => null,
          unobserve: SinonSpy | (() => null) = () => null
        ): MockIntersectionObserver => {
          class IntersectionObserver {
            observe = observe
            unobserve = unobserve
          }

          const oldIntObv = IntersectionObserver ? IntersectionObserver : null

          const restore = () => {
            Object.defineProperty(window, 'IntersectionObserver', {
              writable: true,
              configurable: true,
              value: oldIntObv,
            })
            Object.defineProperty(global, 'IntersectionObserver', {
              writable: true,
              configurable: true,
              value: oldIntObv,
            })
          }

          Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: IntersectionObserver,
          })
          Object.defineProperty(global, 'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: IntersectionObserver,
          })

          return { restore: restore }
        }

        beforeEach(() => {
          observeSpy = sinon.spy()
          mockIntersectionObserver = setupIntersectionObserverMock(observeSpy)
          intersectionObserverSpy = sinon.spy(window, 'IntersectionObserver')
        })
        afterEach(() => {
          mockIntersectionObserver.restore()
          intersectionObserverSpy.resetHistory()
        })

        it('creates an IntersectionObserver with the given handler & options', () => {
          const mockHandler = (_: any) => {
            'do nothing'
          }
          const mockOptions = {
            rootMargin: 'a margin',
            threshold: [0],
          }
          LayoutModule.createIntersectionObserver(mockHandler, mockOptions, [])

          expect(intersectionObserverSpy.calledWith(mockHandler, mockOptions))
            .to.be.true
        })

        it('registers each element in the given array as a target for the Observer', () => {
          const first = ('one' as any) as Element
          const second = ('two' as any) as Element
          const third = ('three' as any) as Element

          LayoutModule.createIntersectionObserver(
            (_: any) => {
              'do nothing'
            },
            {
              rootMargin: 'a margin',
              threshold: [0],
            },
            [first, second, third]
          )

          expect(observeSpy.calledThrice).to.be.true
          expect(observeSpy.calledWith(first)).to.be.true
          expect(observeSpy.calledWith(second)).to.be.true
          expect(observeSpy.calledWith(third)).to.be.true
        })

        it("won't register a falsey value as an observer", () => {
          const falsey = (null as any) as Element

          LayoutModule.createIntersectionObserver(
            (_: any) => {
              'do nothing'
            },
            {
              rootMargin: 'a margin',
              threshold: [0],
            },
            [falsey]
          )

          expect(observeSpy.calledWith(falsey)).to.be.false
        })
      })

      describe('useIsElementStickied()', () => {
        let createIntersectionObserverStub: SinonStub<any, any>

        beforeEach(() => {
          createIntersectionObserverStub = sinon.stub(
            LayoutModule,
            'createIntersectionObserver'
          )
          createIntersectionObserverStub.returns(({
            disconnect: () => {
              'disonnecting observer'
            },
          } as any) as IntersectionObserver)
        })
        afterEach(() => {
          createIntersectionObserverStub.restore()
        })

        it('uses an observation handler to update the header status on intersection changes', () => {
          const mockRef = ({
            current: true,
          } as any) as RefObject<HTMLDivElement>

          const { result } = renderHook(() =>
            LayoutModule.useIsElementStickied(mockRef, -1)
          )

          const handler = createIntersectionObserverStub.args[0][0]
          const mockIOEntry = {
            boundingClientRect: {
              top: 1,
            },
          }

          // before update, header.top <= 0; should return true
          expect(result.current).to.be.true
          act(() => {
            handler([mockIOEntry])
          })
          // after update, is > 0, should return false
          expect(result.current).to.be.false
        })

        it('does not assign an observer if the ref contains a null value', () => {
          const mockRef = ({
            current: null,
          } as any) as RefObject<HTMLDivElement>

          renderHook(() => LayoutModule.useIsElementStickied(mockRef, -1))

          expect(createIntersectionObserverStub.notCalled).to.be.true
        })
      })

      describe('useItems()', () => {
        let items: MenuItem[]
        let contextWrapper: (
          location: string
        ) => { wrapper: React.FunctionComponent; history: router.History }

        let observeSpy: SinonSpy
        let createIntersectionObserverStub: SinonStub<any, any>

        beforeEach(() => {
          items = [
            { text: 'Blog', to: '/first', key: 'first' },
            { text: 'Text2', to: '/#second', key: 'second' },
            { text: 'Text3', to: '/#3', key: '3' },
          ]
          contextWrapper = (initialLocation: string) => {
            const source = testUtils.createBetterSource(initialLocation)
            const history = router.createHistory(source)

            const wrapper: React.FunctionComponent = ({ children }) => (
              <router.LocationProvider history={history}>
                {children}
              </router.LocationProvider>
            )

            return { wrapper: wrapper, history: history }
          }

          observeSpy = sinon.spy()
          createIntersectionObserverStub = sinon.stub(
            LayoutModule,
            'createIntersectionObserver'
          )
          createIntersectionObserverStub.returns(({
            observe: observeSpy,
            disconnect: () => {
              'disonnecting observer'
            },
          } as any) as IntersectionObserver)
        })
        afterEach(() => {
          createIntersectionObserverStub.restore()
          observeSpy.resetHistory()
        })

        it('can set the active tab based on only the first path level on page load', () => {
          const { wrapper } = contextWrapper('/first/post/1')
          const hook = renderHook(() => LayoutModule.useItems(items), {
            wrapper,
          })

          expect(hook.result.current[0].active).to.be.true
          expect(hook.result.current[1].active).to.be.false
          expect(hook.result.current[2].active).to.be.false
        })

        it('updates the active tab if the user is viewing the associated page section', () => {
          const { wrapper } = contextWrapper('/')
          const navRefs: LayoutModule.NavigationRefs = {
            second: {
              current: ('ref second' as any) as HTMLDivElement,
            } as RefObject<HTMLDivElement>,
            '3': {
              current: ('ref 3' as any) as HTMLDivElement,
            } as RefObject<HTMLDivElement>,
          }
          const { result } = renderHook(
            () => LayoutModule.useItems(items, navRefs),
            {
              wrapper,
            }
          )

          const handler = createIntersectionObserverStub.args[0][0]
          const mockIOEntry1 = ({
            isIntersecting: true,
            target: ('ref second' as any) as HTMLDivElement,
          } as any) as IntersectionObserverEntry
          const mockIOEntry2 = ({
            isIntersecting: false,
            target: ('ref 3' as any) as HTMLDivElement,
          } as any) as IntersectionObserverEntry

          expect(result.current[1].active).to.be.false
          act(() => {
            handler([mockIOEntry1, mockIOEntry2])
          })
          expect(result.current[1].active).to.be.true
        })

        it('guards against nulls in sectionRefs current values', () => {
          const { wrapper } = contextWrapper('/')
          const navRefs: LayoutModule.NavigationRefs = {
            second: {
              current: null,
            } as RefObject<HTMLDivElement>,
            '3': {
              current: ('ref 3' as any) as HTMLDivElement,
            } as RefObject<HTMLDivElement>,
          }
          renderHook(() => LayoutModule.useItems(items, navRefs), {
            wrapper,
          })

          expect(observeSpy.calledWith(navRefs['3'].current)).to.be.true
          expect(observeSpy.calledWith(navRefs['second'].current)).to.be.false
        })
      })
    })
  })
})
