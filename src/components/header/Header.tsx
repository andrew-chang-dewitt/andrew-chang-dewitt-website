import React from 'react'
import { Link } from 'gatsby'

import styles from './Header.module.sass'

import { NavMenu, MenuItem } from '../navigation/NavMenu'

interface Props {
  navigationItems: MenuItem[]
  brandingVisibility?: boolean
}

// const getCurrentPosition = (element: HTMLDivElement | null): number => {
//   // return element
//   //   ? // get header position from ref to DOM node
//   //     element.getBoundingClientRect().top
//   //   : // or fallback to value of 0 if ref or ref.current is null
//   //     0
//
//   // for some reason, something in my vim environment flags the optional chaining here
//   // as an error, but I can't find it yet. Code compiles w/ TSC though
//   return element?.getBoundingClientRect().top ?? 0
// }
//
// export let scrollPosition: number
//
// const useWindowScrollPosition = (): number => {
//   const [windowPageYOffset, setWindowPageYOffset] = React.useState(
//     window.pageYOffset
//   )
//
//   useEffect(() => {
//     const listener = () => {
//       // console.log('window scroll listener called')
//       const actual = window.pageYOffset
//       setWindowPageYOffset(actual)
//       scrollPosition = windowPageYOffset
//       console.log(
//         'state:',
//         windowPageYOffset,
//         'exported:',
//         scrollPosition,
//         'actual:',
//         actual
//       )
//       // console.log('new header position:', headerPosition)
//     }
//     window.addEventListener('scroll', listener)
//
//     // cleanup listener
//     return () => {
//       window.removeEventListener('scroll', listener)
//     }
//   }, [])
//
//   return windowPageYOffset
// }
//
// const useElementPosition = (
//   initialPosition: number,
//   headerRef: RefObject<HTMLDivElement>
// ): number => {
//   const node = headerRef.current
//   const windowPageYPosition = useWindowScrollPosition()
//   // using React.method syntax to allow mocking of hook
//   const [headerPosition, setHeaderPosition] = React.useState(initialPosition)
//
//   // update header position anytime window Y position changes
//   useEffect(() => {
//     console.log(
//       'windowPageYPosition from useElementPosition:',
//       windowPageYPosition
//     )
//     setHeaderPosition(getCurrentPosition(node))
//   }, [windowPageYPosition])
//
//   return headerPosition
// }

export const Header = ({
  navigationItems,
  brandingVisibility = true,
}: Props) => {
  // dom ref for getting element positions & manipulating
  // const headerRef = React.useRef<HTMLDivElement>(null)

  // initialize with fake values; will be reset immediately in
  // custom hook that sets up the listener that controls state value
  // const headerPosition = useElementPosition(
  //   getCurrentPosition(headerRef.current),
  //   headerRef
  // )
  // const [brandingVisibility, setBrandingVisibility] = React.useState(
  //   initialBrandingVisibility
  // )
  // const [firstLoad, setFirstLoad] = React.useState(true)

  // useEffect(() => {
  //   // don't change on first running of this hook, this prevents
  //   // the initialBrandingVisibility value from being immediately
  //   // replaced, which is necessary because the headerRef's
  //   // current value starts out as null
  //   if (!firstLoad) {
  //     if (headerPosition === 0) setBrandingVisibility(true)
  //     else setBrandingVisibility(false)
  //   } else {
  //     const initialHeaderPosition = getCurrentPosition(headerRef.current)
  //     console.log('initialHeaderPosition:', initialHeaderPosition)
  //     setBrandingVisibility(initialHeaderPosition === 0 ? true : false)
  //     setFirstLoad(false)
  //   }
  // }, [headerPosition])

  return (
    <header className={styles.header}>
      <div className={`${styles.contents} standardWidth`}>
        <div
          id="branding"
          className={`${styles.branding} ${
            brandingVisibility ? '' : 'hidden ' + styles.hidden
          }`}
        >
          <Link to="/#">ACD</Link>
        </div>
        <div className={styles.navigation}>
          <NavMenu items={navigationItems} />
        </div>
      </div>
    </header>
  )
}
