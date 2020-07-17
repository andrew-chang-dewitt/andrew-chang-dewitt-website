import React, { createRef, RefObject } from 'react'

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

function getCurrentPosition(element: HTMLElement | null): number {
  // for some reason, something in my vim environment flags the optional chaining here
  // as an error, but I can't find it yet. Code compiles w/ TSC though
  return element?.getBoundingClientRect().top ?? 0
}

interface Props {
  navigationItems: MenuItem[]
  pageTitle: string | null
  landing: boolean
  navigationRefs: NavigationRefs
}

interface State {
  headerPosition: number
}

export class Layout extends React.Component<Props, State> {
  mainContentRef: RefObject<HTMLDivElement>
  headerRef: RefObject<HTMLDivElement>
  mergedRefsAndItems: MenuItem[]

  static defaultProps = {
    pageTitle: null,
    landing: false,
    navigationRefs: {},
  }

  constructor(props: Props) {
    super(props)

    this.mainContentRef = createRef<HTMLDivElement>()
    this.mergedRefsAndItems = mergeRefsToItems(
      props.navigationItems,
      props.navigationRefs
    )

    this.headerRef = createRef<HTMLDivElement>()

    this.state = {
      // init w/ junk value, will get actual on mount
      headerPosition: -1,
    }
  }

  setHeaderPosition(value: number) {
    this.setState({
      headerPosition: value,
    })
  }

  componentDidMount() {
    // get actual initial position & set on mount
    this.setHeaderPosition(getCurrentPosition(this.headerRef.current))

    window.addEventListener('scroll', () => {
      this.setHeaderPosition(getCurrentPosition(this.headerRef.current))
    })
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
          navigationItems={this.mergedRefsAndItems}
          brandingVisibility={this.state.headerPosition > 0 ? false : true}
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

// export const LayoutOld: FunctionComponent<Props> = ({
//   children,
//   navigationItems,
//   pageTitle = null,
//   landing = false,
//   navigationRefs = {},
// }) => {
//   const mergedRefsAndItems = mergeRefsToItems(navigationItems, navigationRefs)
//   const mainContentRef = useRef(null)
//
//   return (
//     <div>
//       <AnchorLink
//         to="#main-content"
//         id="skip-to-main-content"
//         className={styles.mainContentLink}
//         target={mainContentRef}
//       >
//         Skip to main content
//       </AnchorLink>
//       {landing ? <Landing /> : null}
//       <Header navigationItems={mergedRefsAndItems} />
//       <div
//         id="main-content"
//         className={styles.content}
//         tabIndex={-1}
//         ref={mainContentRef}
//       >
//         {pageTitle ? <h1 className="title">{pageTitle}</h1> : null}
//         {children}
//       </div>
//     </div>
//   )
// }
