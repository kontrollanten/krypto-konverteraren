import { h } from 'preact';
import styles from './style.less';

export default ({
  children,
  className = '',
  label,
}) => (
  <table className={styles.Table.concat(' ', className)}>
    {label && (
      <tr>
        <th colspan="1000">
          {label}
        </th>
      </tr>
    )}

    {children}
  </table>
);
