import React, { RefObject } from 'react'

import styles from './Layout.module.sass'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'
import { MenuItem } from './navigation/NavMenu'
import { AnchorLink } from './navigation/AnchorLink'

// import utils from '../utils'

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

interface Props {
  navigationItems: MenuItem[]
  navigationRefs: NavigationRefs
  pageTitle: string | null
  landing: boolean
}

interface State {
  headerPosition: number
  navigationItems: MenuItem[]
}

export class Layout extends React.Component<Props, State> {
  mainContentRef: RefObject<HTMLDivElement>
  headerRef: RefObject<HTMLDivElement>

  static defaultProps = {
    navigationRefs: {},
    pageTitle: null,
    landing: false,
  }

  constructor(props: Props) {
    super(props)

    this.mainContentRef = React.createRef<HTMLDivElement>()

    this.headerRef = React.createRef<HTMLDivElement>()

    this.state = {
      // init w/ junk value, will get actual on mount
      headerPosition: -1,
      navigationItems: mergeRefsToItems(
        props.navigationItems,
        props.navigationRefs
      ),
    }
  }

  headerObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      this.setState({
        headerPosition: entry.boundingClientRect.top,
      })
    })
  }

  sectionObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const newNavItems = this.state.navigationItems.map((item) => {
          if (item.targetRef)
            item.active = item.targetRef.current == entry.target
          return item
        })

        this.setState({ navigationItems: newNavItems })
      }
    })
  }

  componentDidMount = () => {
    if (this.headerRef.current) {
      new window.IntersectionObserver(this.headerObserver, {
        rootMargin: '0px',
        threshold: [0],
      }).observe(this.headerRef.current)
    }

    const refs = Object.keys(this.props.navigationRefs)
    if (refs.length > 0) {
      const sectionIO = new window.IntersectionObserver(this.sectionObserver, {
        rootMargin: '-50%',
        threshold: [0],
      })

      this.state.navigationItems.forEach((item) => {
        if (item.targetRef && item.targetRef.current)
          sectionIO.observe(item.targetRef.current)
      })
    }
  }

  render() {
    return (
      <div>
        <AnchorLink
          to="#main-content"
          id="skip-to-main-content"
          className={styles.mainContentLink}
          target={this.mainContentRef}
        >
          Skip to main content
        </AnchorLink>
        {this.props.landing ? <Landing /> : null}
        {/*create dummy div for header ref*/}
        <div ref={this.headerRef}></div>
        <Header
          navigationItems={this.state.navigationItems}
          brandingVisibility={this.state.headerPosition <= 0}
        />
        <div
          id="main-content"
          className={styles.content}
          tabIndex={-1}
          ref={this.mainContentRef}
        >
          {this.props.pageTitle ? (
            <h1 className="title">{this.props.pageTitle}</h1>
          ) : null}
          {this.props.children}
        </div>
      </div>
    )
  }
}
