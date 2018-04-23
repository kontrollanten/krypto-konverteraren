import { h } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import ContentWrapper from '../content-wrapper';
import styles from './style.less';

export default () => (
  <div className={styles.Container}>
    <div className={styles.Header}>
      <div>
        <h1>Fast med deklarationen för dina kryptovalutor?</h1>
        <h2>K4 Krypto gör valutakonverteringen åt dig!</h2>
        <p>(Så du får fria händer att fortsätta hodla) <i class="em em-fist"></i></p>
        <div style={{ textAlign: 'center' }}>
          <Button raised >
            <a href="/las-av-fil">
              Börja nu <i class="em em-rocket"></i>
            </a>
          </Button>
        </div>
      </div>
    </div>
    <div className={styles.Presentation}>
      <div>
        <h2>Bli av med det direkt! <i class="em em-heavy_check_mark"></i></h2>
        <ol>
          <li>Hämta din CSV-fil genom att enkelt exportera den från respektive exchange och/eller wallet.</li>
          <li>Ladda upp filerna på K4 Krypto</li>
          <li>K4 Krypto adderar en kolumn med SEK-värdet i respektive fil.</li>
          <li>Klart! Ladda ned den nya konverterade filen!</li>
        </ol>
      </div>

      <div>
        <h2>Vi värnar om din integritet <i class="em em-hand"></i></h2>
        <p>K4 Krypto sparar ingen data från användarna. Hela processen sker lokalt, den går aldrig via våra servrar.</p>
      </div>
    </div> 
  </div>
);

