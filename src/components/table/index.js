import { h } from 'preact';
import styles from './style.less';

export default ({ children, className = '' }) => (
  <table className={styles.Table.concat(className)}>
    {children}
  </table>
);
