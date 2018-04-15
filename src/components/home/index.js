import { h } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import ContentWrapper from '../content-wrapper';
import SubscribeToNewsletter from '../subscribe-to-newsletter';
import styles from './style.less';

export default () => (
  <ContentWrapper className={styles.Container}>
    <div className={styles.Header}>
      <div>
        <h1>Har du handlat med kryptovalutor?</h1>
        <h2>Förenkla din inkomstdeklaration med ett par klick!</h2>
        <div style={{ textAlign: 'center' }}>
          <Button raised >
            <a href="/las-av-fil">
              Börja nu
            </a>
          </Button>
        </div>
      </div>
    </div>
    <div className={styles.Presentation}>
      <div> 
        <h2>Varför?</h2>
        <p>När du deklarerar din handel med kryptovalutor ska du deklarera all handel mellan olika kryptovalutor samt värdet av respektive transaktion i SEK.</p>
        <p>Detta innebär för många att de behöver räkna om belopp för hundratals transaktioner.</p>
      </div>

      <div>
        <h2>Hur?</h2>
        <ol>
          <li>Exportera din transaktionshistorik från respektive exchange och/eller wallet.</li>
          <li>Ladda upp filerna på K4 Krypto.</li>
          <li>K4 Krypto adderar en kolumn med SEK-värdet i respektive fil.</li>
          <li>Ladda ner de nya filerna.</li>
        </ol>
      </div>
    </div> 
  </ContentWrapper>
);

