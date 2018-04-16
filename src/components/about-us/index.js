import { h } from 'preact';
import Helmet from 'preact-helmet';
import ContentWrapper from '../content-wrapper';

export default () => (
  <ContentWrapper textContent>
    <Helmet
      title="Om K4 Krypto"
    />
    <h1>Om K4 Krypto</h1>
    <p>Vi har alla hört de många påståendena flyga kors och tvärs genom forum, på bloggar och i media. Vad och hur är man skyldig att deklarera sina kryptovalutor? Vi var en grupp blockchain-entusiaster som tillslut var tvungna att skapa oss en egen och rättvis uppfattning om vad som faktiskt gällde.</p>

    <p>Efter många timmar i Skatteverkets telefonköer, ännu fler spenderade på googlande landade vi säkert i vår tolkning om kravet på en mycket gedigen och detaljerad redogörelse för varje persons samtliga transaktioner - hur orimligt och ouppnåeligt det än lät. Vi förstod att detta skulle vara väldigt tidskrävande, men det var först när vi suttit med våra egna papper i tre dagar som vi insåg att vi måste komma på något bättre. Vi beslutade oss för att slå ihop våra kompetenser för att bygga ett verktyg som kunde automatisera konverteringen av alla transaktioner, samtliga kursvärden och på korrekt datum.</p>

    <p>Tiden har varit knapp och deadlinen tydlig. Skatteverket är inte kända för givmildhet när det gäller deklarationsdispans. Med några veckors marginal fick vi till ett verktyg som faktiskt löste det största hindret. När vi såg hur smidigt det fungerade för oss hade vi ingen anledning att inte dela med oss till andra. ju fler som testade desto mer utveckling krävdes.</p>

    <p>Efter många svettiga timmar för att förtydliga och förfina tjänsten kunde vi äntligen släppa en tjänst vi tyckte var tillräckligt bred och smidig för att fungera i många olika typer av situationer. K4 Krypto har nu fått se dagens ljus!</p>

    <p>Vi är i ett tidigt skede och har inte hunnit stresstesta den i den utsträckning vi skulle önskat utan prioriterat enkelhet och att kunna släppa den i någorlunda tid för att hinna användas till deklarationen.</p>

    <p>Du får jättegärna stötta vårt arbete så att vi kan utveckla den vidare genom att swisha till 0738 900 157</p>
    <p>Stort lycka till!</p>
    <p>&nbsp;</p>

    <p><strong>Kim Kjellbom</strong></p>
    <p><strong>Initiativtagare till K4 Krypto</strong></p>

    <p><a href="mailto:kim@k4krypto.se">kim@k4krypto.se</a></p>
  </ContentWrapper>
);
