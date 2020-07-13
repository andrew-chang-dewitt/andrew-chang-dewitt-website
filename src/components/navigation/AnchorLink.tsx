import React, { FunctionComponent, MutableRefObject } from 'react'
import Link from 'gatsby-link'

interface Props {
  to: string
  target: MutableRefObject<any>
  id: string
  className: string
  // id?: string
  // className?:string
}

export const AnchorLink: FunctionComponent<Props> = ({
  children,
  to,
  target,
  id,
  className,
}) => {
  // side effects document.activeElement by calling focus on a given Ref
  // NEEDS IMPROVEMENT: currently the call to .focus() was happening before
  // css's `scroll-behavior: smooth` has a chance to actually scroll to
  // the target, below is a hacky fix that just delays the call to
  // the target element's focus method by 500ms to give time for
  // smooth scroll to animate
  // >>> POSSIBLE BETTER FIX:
  // try having target not be the ref, but instead a function that'll
  // modify a target Component's `takeFocus` prop,
  // then, in the target Component, have a useEffect that watches for
  // changes to takeFocus & that the component is in the current
  // viewport, then gives focus to the desired ref in the Component
  // gonna take some refactoring though.
  const giveFocus = (_: React.MouseEvent): void => {
    setTimeout(() => {
      if (target.current) target.current.focus()
    }, 500)
  }

  return (
    <Link id={id} className={className} to={to} onClick={giveFocus}>
      {children}
    </Link>
  )
}
