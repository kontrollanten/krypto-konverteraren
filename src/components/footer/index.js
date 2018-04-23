import { h } from 'preact';
import { Link } from 'preact-router';
import styles from './style.less';

export default () => (
  <footer className={styles.Container}>
    <div className={styles.InnerContainer}>
      <div>
        <h3>Om K4 Krypto</h3>
          <p>K4 Krypto låter dig konvertera dina transaktioner till SEK via ett par enkla klick. Du får sedan en färdig fil att ladda ned för din deklaration.</p>
      </div>

      <div>
        <h3>Navigering</h3>
        <nav>
          <ul>
            <li><Link href="/ansvar-och-villkor">Ansvar och villkor</Link></li>
            <li><Link href="/fragor-och-svar">Frågor och svar</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
);
