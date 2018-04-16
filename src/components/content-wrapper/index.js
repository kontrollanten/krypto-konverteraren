import { h } from 'preact';

import styles from './style.less';

export default ({ children, className = '', textContent = false, ...props }) => (
  <div className={[styles.Container].concat(className, textContent && styles.TextContent).join(' ')} {...props}>
    {children}
  </div>
);
