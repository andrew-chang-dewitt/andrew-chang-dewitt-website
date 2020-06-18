import React, { FunctionComponent } from 'react'

import styles from './Layout.module.sass'

// export interface Props {
//   navPanelStyle: string
// }

// export const Layout: FunctionComponent<Props> = ({
export const Layout: FunctionComponent = ({
  // navPanelStyle,
  children,
}) => <div className={styles.content}>{children}</div>

// Layout.defaultProps = {
//   navPanelStyle: 'default',
// }
