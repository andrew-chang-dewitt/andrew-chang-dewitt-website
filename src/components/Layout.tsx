import React, { RefObject } from 'react'
import { useLocation } from '@reach/router'

import styles from './Layout.module.sass'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'
import { MenuItem } from './navigation/NavMenu'
import { AnchorLink } from './navigation/AnchorLink'

export const navItems: MenuItem[] = [
  {
    to: '/#about',
    text: 'About',
    key: 'about',
  },
  {
    to: '/#featured-projects',
    text: 'Projects',
    key: 'featured-projects',
  },
  {
    to: '/#hire-me',
    text: 'Hire Me',
    key: 'hire-me',
  },
  {
    to: '/#contact-me',
    text: 'Contact Me',
    key: 'contact-me',
  },
  {
    to: '/blog',
    text: 'Blog',
    key: 'blog',
  },
]

export interface NavigationRefs {
  [name: string]: RefObject<HTMLDivElement>
}

export const mergeRefsToItems = (items: MenuItem[], refs: NavigationRefs) => {
  // merge a hashmap of navigation refs to the navigation items
  // by key before passing to Header
  return items.map((item) => {
    if (refs[item.key]) {
      item.targetRef = refs[item.key]
    }
    return item
  })
}

// interface PropsCl {
//   navigationItems: MenuItem[]
//   navigationRefs: NavigationRefs
//   pageTitle: string | null
//   landing: boolean
// }
//
// interface State {
//   headerPosition: number
//   navigationItems: MenuItem[]
// }
//
// export class LayoutCl extends React.Component<PropsCl, State> {
//   mainContentRef: RefObject<HTMLDivElement>
//   headerRef: RefObject<HTMLDivElement>
//
//   static defaultProps = {
//     navigationRefs: {},
//     pageTitle: null,
//     landing: false,
//   }
//
//   constructor(props: PropsCl) {
//     super(props)
//
//     this.mainContentRef = React.createRef<HTMLDivElement>()
//
//     this.headerRef = React.createRef<HTMLDivElement>()
//
//     this.state = {
//       // init w/ junk value, will get actual on mount
//       headerPosition: -1,
//       navigationItems: mergeRefsToItems(
//         props.navigationItems,
//         props.navigationRefs
//       ),
//     }
//   }
//
//   headerObserver = (entries: IntersectionObserverEntry[]) => {
//     entries.forEach((entry) => {
//       this.setState({
//         headerPosition: entry.boundingClientRect.top,
//       })
//     })
//   }
//
//   sectionObserver = (entries: IntersectionObserverEntry[]) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const newNavItems = this.state.navigationItems.map((item) => {
//           if (item.targetRef)
//             item.active = item.targetRef.current == entry.target
//           return item
//         })
//
//         this.setState({ navigationItems: newNavItems })
//       }
//     })
//   }
//
//   componentDidMount = () => {
//     if (this.headerRef.current) {
//       new window.IntersectionObserver(this.headerObserver, {
//         rootMargin: '0px',
//         threshold: [0],
//       }).observe(this.headerRef.current)
//     }
//
//     const refs = Object.keys(this.props.navigationRefs)
//     if (refs.length > 0) {
//       const sectionIO = new window.IntersectionObserver(this.sectionObserver, {
//         rootMargin: '-50%',
//         threshold: [0],
//       })
//
//       this.state.navigationItems.forEach((item) => {
//         if (item.targetRef && item.targetRef.current)
//           sectionIO.observe(item.targetRef.current)
//       })
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         <AnchorLink
//           to="#main-content"
//           id="skip-to-main-content"
//           className={styles.mainContentLink}
//           target={this.mainContentRef}
//         >
//           Skip to main content
//         </AnchorLink>
//         {this.props.landing ? <Landing /> : null}
//         {/*create dummy div for header ref*/}
//         <div ref={this.headerRef}></div>
//         <Header
//           navigationItems={this.state.navigationItems}
//           brandingVisibility={this.state.headerPosition <= 0}
//         />
//         <div
//           id="main-content"
//           className={styles.content}
//           tabIndex={-1}
//           ref={this.mainContentRef}
//         >
//           {this.props.pageTitle ? (
//             <h1 className="title">{this.props.pageTitle}</h1>
//           ) : null}
//           {this.props.children}
//         </div>
//       </div>
//     )
//   }
// }

interface IOOptions {
  rootMargin: string
  threshold: number[]
}

interface IOHandler {
  (entries: IntersectionObserverEntry[]): void
}

export const createIntersectionObserver = (
  handler: IOHandler,
  options: IOOptions,
  observables: Element[]
) => {
  const observer = new window.IntersectionObserver(handler, options)

  observables.forEach((observable) => {
    observer.observe(observable)
  })

  return observer
}

export const useItems = (startingItems: MenuItem[]) => {
  // const [location, setLocation] = useState(useLocation())
  const location = useLocation()
  const path = location.pathname.substr(1).split('/')[0]
  const hash = location.hash.substr(1)

  // determines if a given item should is considered active
  // based on the current location
  const isActiveItem = (item: MenuItem): boolean => {
    switch (item.key) {
      case path:
        return true

      case hash:
        return path === ''

      default:
        return false
    }
  }

  const setActiveItem = (items: MenuItem[]): MenuItem[] =>
    items.map((item) => {
      item.active = isActiveItem(item)
      return item
    })

  // init nav menu items based on current component location
  const [items, setItems] = React.useState(setActiveItem(startingItems))

  // updates items state object on location change
  React.useEffect(() => {
    setItems(setActiveItem(items))
  }, [location])

  return items
}

export const useIsElementStickied = (
  elementRef: RefObject<HTMLDivElement>,
  initialPosition: number
) => {
  const [elementPosition, setElementPosition] = React.useState(initialPosition)

  const observerHandler = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setElementPosition(entry.boundingClientRect.top)
    })
  }

  React.useEffect(() => {
    if (elementRef.current) {
      const observer = createIntersectionObserver(
        observerHandler,
        {
          rootMargin: '0px',
          threshold: [0],
        },
        [elementRef.current]
      )

      // cleans up observer on unmount
      return () => {
        observer.disconnect()
      }
      // or does nothing if current was null
    } else return () => {}
  }, [elementRef.current])

  return elementPosition <= 0
}

// sectionObserver = (entries: IntersectionObserverEntry[]) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const newNavItems = this.state.navigationItems.map((item) => {
//         if (item.targetRef) item.active = item.targetRef.current == entry.target
//         return item
//       })
//
//       this.setState({ navigationItems: newNavItems })
//     }
//   })
// }

interface Props {
  navigationItems: MenuItem[]
  navigationRefs?: NavigationRefs
  pageTitle?: string | null
  landing?: boolean
}

export const Layout: React.FunctionComponent<Props> = ({
  navigationItems,
  navigationRefs = {},
  pageTitle = null,
  landing = false,
  children,
}) => {
  const mainContentRef = React.useRef<HTMLDivElement>(null)
  const headerRef = React.useRef<HTMLDivElement>(null)

  const headerIsStickied = useIsElementStickied(headerRef, -1)
  const navItems = useItems(mergeRefsToItems(navigationItems, navigationRefs))

  return (
    <div>
      <AnchorLink
        to="#main-content"
        id="skip-to-main-content"
        className={styles.mainContentLink}
        target={mainContentRef}
      >
        Skip to main content
      </AnchorLink>
      {landing ? <Landing /> : null}
      {/*create dummy div for header ref*/}
      <div ref={headerRef}></div>
      <Header
        navigationItems={navItems}
        brandingVisibility={headerIsStickied}
      />
      <div
        id="main-content"
        className={styles.content}
        tabIndex={-1}
        ref={mainContentRef}
      >
        {pageTitle ? <h1 className="title">{pageTitle}</h1> : null}
        {children}
      </div>
    </div>
  )
}
