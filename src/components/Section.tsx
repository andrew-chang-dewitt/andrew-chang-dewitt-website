import React from 'react'

// adding children property on Props interface per
// https://stackoverflow.com/a/54677641
interface Props extends React.ComponentPropsWithoutRef<'section'> {
  id: string
  title?: string
}

export const Section = React.forwardRef<HTMLDivElement, Props>(
  ({ id, title, children }, ref) => (
    <section ref={ref} id={id} tabIndex={-1}>
      {title ? <h1 className="title">{title}</h1> : ''}
      <div className="section-wrapper">
        <div className="contents">{children}</div>
      </div>
    </section>
  )
)
