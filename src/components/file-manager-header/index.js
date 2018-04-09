import { h } from 'preact';

import styles from './style.less';

export default ({ children }) => (
  <div className={styles.Header}>
    {children}
  </div>
);
