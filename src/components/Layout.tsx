import React, { FunctionComponent, MutableRefObject } from 'react'

import styles from './Layout.module.sass'

import { Landing } from './pages/Landing'
import { Header } from './header/Header'
import { MenuItem } from './navigation/NavMenu'

export interface NavigationRefs {
  [name: string]: MutableRefObject<any>
}

interface Props {
  navigationItems: MenuItem[]
  pageTitle?: string | null
  landing?: boolean
  navigationRefs?: NavigationRefs
}

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

export const Layout: FunctionComponent<Props> = ({
  children,
  navigationItems,
  pageTitle = null,
  landing = false,
  navigationRefs = {},
}) => {
  const mergedRefsAndItems = mergeRefsToItems(navigationItems, navigationRefs)

  return (
    <div>
      {landing ? <Landing /> : null}
      <Header navigationItems={mergedRefsAndItems} />
      <div id="main-content" className={styles.content}>
        {pageTitle ? <h1 className="title">{pageTitle}</h1> : null}
        {children}
      </div>
    </div>
  )
}
