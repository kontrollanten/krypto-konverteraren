import { h } from 'preact';
import Helmet from 'preact-helmet';
import ContentWrapper from '../content-wrapper';

export default () => (
  <ContentWrapper textContent>
    <Helmet
      title="Frågor och svar om K4 Krypto"
    />
    <h1>Frågor och svar</h1>

    <h2>Vad är K4?</h2>
    <p>K4 är benämningen på den blankett som Skatteverket skickar ut för deklaration av värdepapper. Det är även denna du fyller i dina transaktioner för kryptovalutor.</p>

    <h2>När ska deklarationen lämnas in?</h2>
    <p>Deklarationen ska lämnas in den 2 maj till Skatteverket.</p>

    <h2>CSV-what?</h2>
    <p>På din exchange eller wallet kan du (i de allra flesta fall) ladda ned en CSV-fil. Detta är en excel-liknande fil som innehåller tabeller över dina transaktioner med bland annat belopp och datum. Genom enkel drag and drop konverterar du filen och får sedan tillbaka en fil i samma format men med dina transaktioner i SEK i en ny kolumn/kolumner.</p>

    <h2>Hur växlas valutorna?</h2>
    <p>Alla valutor växlas genom en extern part som heter CryptoCompare. Mer om hur de arbetar kan du läsa om på <a href="https://min-api.cryptocompare.com">https://min-api.cryptocompare.com</a>.</p>

    <h2>Hur exakt blir resultatet?</h2>
    <p>Vi kan inte garantera ett exakt resultat. All vår konvertering går via CryptoCompare. När en valuta ska konverteras måste den göra det i ett antal steg för att visa resultatet i SEK. Konverteringen går från kryptovalutan till USD till SEK. För mindre valutor görs först en växling till BTC. Detta betyder att det kan bli viss differens i konverteringskedjan. Allt detta sker dock automatiskt och är ingenting du behöver bry dig om. Resultatet detsamma som om du skulle följt kedjan manuellt hos CryptoCompare, men vi gör det åt dig!Vi lämnar inga garantier och ansvarar inte för att växlingen blir precist korrekt utan tillhandahåller endast en växling så som om du skulle hämtat den manuellt från CryptoCompare.</p>

    <h2>Vad kostar det?</h2>
    <p>Tjänsten är helt gratis. Om du tycker att verktyget hjälpt dig på ett bra sätt får du jättegärna lämna ett bidrag till oss för det arbete vi lagt ned samt att vi ska kunna utveckla och effektivisera den ännu mer till nästa deklaration.</p>

    <h2>Varför är det gratis?</h2>
    <p>Vi började med att utveckla tjänsten för oss själva för att vi ville se om det gick att effektivisera den här proceduren på ett smidigt sätt. När det fungerade såg vi ingen anledning att inte dela med oss av detta smidiga verktyg till andra som sitter i samma sits. Eftersom vi haft bråttom att bygga tjänsten och inte hunnit stresstesta den som vi skulle önska kan vi inte lämna några garantier. Därför vill vi heller inte ta betalt.</p>

    <h2>Hur kan jag stötta projektet?</h2>
    <p>Förhoppningen är att vi ska kunna fortsätta optimera och utveckla tjänsten och vi är väldigt tacksamma för bidrag. Detta kan göras via Swish till 0738 900 157. Vill du hjälpa till på annat sätt kan du kontakta oss på <a href="mailto:info@k4krypto.se">info@k4krypto.se</a>.</p>

    <h2>Vilka garantier finns?</h2>
    <p>Inga. K4 Krypto är gratis just för att vi inte kan garantera att den fungerar ultimat tillsammans med samtliga växlingssiter och för alla situationer. Vad gäller skatteverkets krav har vi utgått från den information vi fått från Skatteverkets rådgivare, offentligt tryck och så som vi tolkat dessa kriterier. Varje individ ansvarar dock själv för att vara korrekt informerad och handla utefter de krav som ställs på just dennes specifika situation. Vi lämnar inte heller några garantier för beloppen som genereras.</p>

    <h2>Säkerhet och integritet då?</h2>
    <p>Vi spar inga uppgifter från våra användare. Eftersom du inte laddar upp någon information, utan endast konverterar datan lokalt går den inte via någon tredjepartsserver och vi sparar därför inga uppgifter du laddar upp.</p>

    <h2>Vart kan jag läsa mer om deklaration av kryptovalutor?</h2>
    <p>Vi tar inget ansvar för din deklaration och rekommenderar starkt att du läser på om hur och varför du ska deklarera samt vilka krav som ställs på dig som är skatteskyldig i Sverige. Här finns goda utgångspunkter för att lära dig mer om ämnet:</p>
    <ul>
      <li><a href="https://www.skatteverket.se/privat/skatter/vardepapper/andratillgangar/kryptovalutor.4.15532c7b1442f256bae11b60.html" target="_blank">Skatteverket om kryptovalutor</a></li>
      <li><a href="http://www.diva-portal.org/smash/get/diva2:898921/FULLTEXT01.pdf" target="_blank">Masteruppsats från Juridiska institutionen vid Uppsala gällande skatterätt och Bitcoin</a></li>
      <li><a href="http://www.dagensjuridik.se/2017/12/vardeokningen-pa-kryptovalutor-kan-fa-stora-konsekvenser-skatterattsligt" target="_blank">Debattartikel om skatterätt gällande kryptovalutor i Dagens juridik</a></li>
      <li><a href="https://cornucopia.cornubot.se/2018/03/problem-deklarera-affarer-i-bitcoin.html" target="_blank">Conocopia, en blogg som tar upp deklaration av kryptovalutor</a></li>
    </ul>

    <h2>Och en sista påminnelse...</h2>
    <p>K4 Krypto avråder och tar avstånd från all typ av olaglig handel och aktivitet kopplat till kryptovalutor. Skattesmitning, på samtliga nivåer, är inte bara oetiskt utan olagligt och mycket riskfyllt och något vi starkt avråder från.</p>

    <p>Vi uppmanar givetvis till eget omdöme och att varje enskild individ undersöker sin specifika situation och vilka regler som blir applicerbara. Vi ger här allmän information så som vi tolkat det sammanlagda flödet från forskning, myndigheter och media. Vi tar inget ansvar för enskilda individers agerande. Vi avsäger oss också allt ansvar för uppgifterna som lämnas in till skatteverket eller de som genereras till dig via tjänsten. Det är användarens eget ansvar att kontrollera att samtliga uppgifter stämmer. Vi lämnar heller inte några garantier kring belopp eller kursangivelse. Vi hämtar all information och kursvärde från <a href="https://cryptocompare.com" target="_blank">cryptocompare.com</a>.</p>

  </ContentWrapper>
);
