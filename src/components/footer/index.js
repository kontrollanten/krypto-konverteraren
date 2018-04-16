import { h } from 'preact';
import { Link } from 'preact-router';
import styles from './style.less';

export default () => (
  <footer className={styles.Container}>
    <div className={styles.InnerContainer}>
      <div>
        <h3>Om K4 Krypto</h3>
          <p>När du deklarerar din handel med kryptovalutor ska du deklarera all handel mellan olika kryptovalutor samt värdet av respektive transaktion i SEK.</p>
          <p>K4 Krypto låter dig konvertera dina transaktioner till SEK via ett par enkla klick. Du får sedan en färdig fil att ladda ned för din deklaration.</p>
      </div>

      <div>
        <h3>Navigering</h3>
        <nav>
          <ul>
            <li><Link href="/ansvar-och-villkor">Ansvar och villkor</Link></li>
            <li><Link href="/fragor-och-svar">Frågor och svar</Link></li>
            <li><Link href="/om-tjansten">Om tjänsten</Link></li>
            <li><Link href="/om-k4-krypto">Om oss</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
);
