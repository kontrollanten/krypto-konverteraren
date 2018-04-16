import { h } from 'preact';
import Helmet from 'preact-helmet';
import ContentWrapper from '../content-wrapper';

export default () => (
  <ContentWrapper textContent>
    <Helmet
      title="Om tjänsten"
    />
    <h1>Om tjänsten</h1>
    <p>Du som köpt eller sålt kryptovalutor är skyldig att deklarera detta till Skatteverket i Sverige. Detta ska göras genom en blankett som heter K4. <a href="https://www.skatteverket.se/privat/sjalvservice/blanketterbroschyrer/blanketter/info/2104.4.39f16f103821c58f680006244.html" target="_blank">Läs mer om detta på Skatteverkets hemsida.</a></p>

    <p>I blanketten är du skyldig att redogöra för samtliga transaktioner du gjort, alltså via fiatvalutor och mellan dina digitala valutor. Samtliga transaktioner ska redogöras för i SEK och i den kurs som båda valutorna hade den dagen transaktionen genomfördes.</p>

    <p>Ex. Du köpte ETH för BTC den 9 mars. Du måste då redogöra för vad BTC stod i SEK samt vad ETH stod i SEK den 9 mars.</p>

    <p>Detta gäller varje transaktion du gjort under året. Varje valuta måste konverteras till SEK för det aktuella datumet och manuellt matas in i dokumentet. Du förstår ganska snabbt att det är många som har en enorm arbetsbörda framför sig.</p>

    <p>Med K4 Krypto hoppas vi att du ska slippa detta. Filen som innehåller dina transaktioner, CSV-filen, kan du på de flesta större växlingssiter ladda ned med ett enkelt klick. I denna redogörs samtliga transaktioner men då i de valutor som transaktionen gällt. Genom att ladda upp filen här på K4 Krypto konverteras samtliga valutor in till SEK automatiskt. Du får sedan en ny CSV-fil och kan utifrån denna skapa din blankett precis så som Skatteverket vill ha den. Du slipper på så sätt hela konverteringsprocessen – smidigt va?</p>
  </ContentWrapper>
);
