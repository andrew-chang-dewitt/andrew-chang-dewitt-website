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
  // FIXME: currently the call to .focus() is happening before
  // css's `scroll-behavior: smooth` has a chance to actually scroll to
  // the target
  const giveFocus = (_: React.MouseEvent): void => {
    if (target && target.current) target.current.focus()
  }

  return (
    <Link id={id} className={className} to={to} onClick={giveFocus}>
      {children}
    </Link>
  )
}
