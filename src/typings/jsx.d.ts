import React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    tabindex?: string
  }
}
