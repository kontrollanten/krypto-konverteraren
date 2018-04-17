import { h } from 'preact';
import Icon from 'preact-material-components/Icon';
import styles from './style.less';

export default ({ children }) => (
  <div className={styles.Container}>
    <div className={styles.Inner}>
      <div>
        <Icon className={styles.Icon}>warning</Icon>
      </div>
      <div>
        {children}
      </div>
    </div>
  </div>
);
