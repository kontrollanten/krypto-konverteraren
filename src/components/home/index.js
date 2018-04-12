import { h } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import ContentWrapper from '../content-wrapper';
import SubscribeToNewsletter from '../subscribe-to-newsletter';
import styles from './style.less';

export default () => (
  <ContentWrapper>
    <div className={styles.Header}>
      <div>
        <h1>Har du handlat med kryptovalutor?</h1>
        <h2>Förenkla din inkomstdeklaration med ett par klick!</h2>
        <p>Anmäl dig till vårat nyhetsbrev för att bli meddelad när vi lanserar.</p>
        <SubscribeToNewsletter />
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
      <div className={styles.When}>
        <h2>När?</h2>
        <p>Snart. I dagsläget har vi en fungerande proof-of-concept, planen är att lansera en första version senast den 15:e april. Skriv upp dig på vårt nyhetsbrev så återkommer vi med uppdateringar.</p>
      </div>
    </div> 
  </ContentWrapper>
);

