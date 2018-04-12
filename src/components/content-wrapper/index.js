import { h } from 'preact';

import styles from './style.less';

export default ({ children, className = '' }) => (
  <div className={styles.Container.concat(' ', className)}>
    {children}
  </div>
);
