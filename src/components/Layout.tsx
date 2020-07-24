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
  observables: (Element | null)[]
) => {
  const observer = new window.IntersectionObserver(handler, options)

  observables.forEach((observable) => {
    if (observable) observer.observe(observable)
  })

  return observer
}

export const useItems = (
  startingItems: MenuItem[],
  sectionRefs: NavigationRefs = {}
) => {
  const location = useLocation()
  const path = location.pathname.substr(1).split('/')[0]

  // determines if a given item should is considered active
  // based on the current location
  const isActiveItem = (item: MenuItem): boolean => {
    switch (item.key) {
      case path:
        return true

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
  const [items, setItems] = React.useState(
    setActiveItem(mergeRefsToItems(startingItems, sectionRefs))
  )

  const observerHandler = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setItems(
          items.map((item) => {
            if (item.targetRef) {
              // must rebuild the item to avoid bug where it
              // wouldn't actually update
              return {
                ...item,
                active: item.targetRef.current == entry.target,
              }
            }
            return item
          })
        )
      }
    })
  }

  React.useEffect(() => {
    const refs = Object.keys(sectionRefs)
    if (refs.length > 0) {
      const elements = refs.map((ref) => {
        if (sectionRefs[ref].current) return sectionRefs[ref].current
        else return null
      })
      const observer = createIntersectionObserver(
        observerHandler,
        {
          rootMargin: '-50%',
          threshold: [0],
        },
        elements
      )

      items.forEach((item) => {
        if (item.targetRef && item.targetRef.current)
          observer.observe(item.targetRef.current)
      })
      //
      // cleans up observer on unmount
      return () => {
        observer.disconnect()
      }
    } // or does nothing if sectionRefs was empty
    else return () => {}
  }, [])

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

  // get ref to landing & add to navigationRefs to include in
  // scroll behavior for active tab status changes
  const landingRef = React.useRef<HTMLDivElement>(null)
  navigationRefs['landing'] = landingRef

  const headerIsStickied = useIsElementStickied(headerRef, -1)
  const navItems = useItems(navigationItems, navigationRefs)

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
      {landing ? (
        <div ref={landingRef}>
          <Landing />
        </div>
      ) : null}
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
