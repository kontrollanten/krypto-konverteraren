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
  <div className={styles.Container}>
    <div className={styles.Header}>
      <div>
        <h1>Fast med deklarationen för dina kryptovalutor?</h1>
        <h2>K4 Krypto gör valutakonverteringen åt dig!</h2>
        <p>(Så du får fria händer att forstsätta hodla)</p>
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
        <h2>Bli av med det direkt!</h2>
        <ol>
          <li>Hämta din CSV-fil genom att enkelt exportera den från respektive exchange och/eller wallet.</li>
          <li>Ladda upp filerna på K4 Krypto</li>
          <li>K4 Krypto adderar en kolumn med SEK-värdet i respektive fil.</li>
          <li>Klart! Ladda ned den nya konverterade filen!</li>
        </ol>
      </div>

      <div>
        <h2>Vi värnar om din integritet</h2>
        <p>K4 Krypto sparar ingen data från användarna. Hela processen sker lokalt, den går aldrig via våra servrar.</p>
      </div>

      <div> 
        <h2>Konvertera alla dina transaktioner!</h2>
          <p>När du deklarerar din handel med kryptovalutor kräver ska du redogöra för alla transaktioner. Dessutom ska alla belopp konverteras till SEK så som kursen stod vid transaktionstillfället. Ja, du hör ju. Att göra detta manuellt är enormt tidskrävande och krångligt.</p>
          <p>K4 Krypto låter dig istället konsertera dina transaktioner till SEK via ett par enkla klick. Du får sedan en färdig fil att ladda ned för din deklaration.</p>
        <p>När du deklarerar din handel med kryptovalutor ska du deklarera all handel mellan olika kryptovalutor samt värdet av respektive transaktion i SEK.</p>
        <p>Detta innebär för många att de behöver räkna om belopp för hundratals transaktioner.</p>
      </div>
    </div> 
  </div>
);

