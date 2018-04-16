import { h } from 'preact';
import Helmet from 'preact-helmet';
import ContentWrapper from '../content-wrapper';

export default () => (
  <ContentWrapper textContent>
    <Helmet
      title="Ansvar och villkor"
    />
    <h1>Ansvar och villkor</h1>
    <p>K4 Krypto avråder och tar avstånd från all typ av oegentligheter i fråga om handel och aktivitet kopplat till kryptovalutor. Vi tar inget ansvar för enskilda individers agerande. Vi uppmanar varje enskild individ att undersöka sitt specifika utgångsläge och vilka regler och krav som blir applicerbara på dennes situation.</p> 
    <p>Även om K4 Krypto har gjort ett grundligt arbete för att förstå och tolka de krav som ställs på deklarering av kryptovalutor, lämnar vi inga garantier för att informationen ska vara en heltäckande eller säker referens. Vi ger här generella uppgifter så som vi tolkat den information vi tillförskansat oss. Tjänsten är utformad utifrån vår tolkning av Skatteverkets information och så som vi bäst ser oss kunna uppfylla deras krav så som de i nuläget är förmedlade.</p>
    <p>K4 Krypto lämnar inga garantier, explicit eller implicit, gällande datan som genereras eller informationen på sidan som tillförlitlig, korrekt, heltäckande, hållbar eller korrekt.</p> 
    <p>Vi avsäger oss allt ansvar för de uppgifter användaren lämnar in till Skatteverket. Det är användarens eget ansvar att kontrollera att samtliga uppgifter stämmer. Vi lämnar inte några garantier kring belopp eller kursangivelse. Vi hämtar allt underlag för konvertering och samtliga kursvärden från cryptocompare.com. Läs mer om deras arbete här.</p> 
  </ContentWrapper>
);
