import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';

export default class ThanksForUsing extends Component {
  componentDidMount() {
    this.dialogRef.MDComponent.show();
  }

  render() {
    return (
      <Dialog ref={scrollingDlg=>{this.dialogRef=scrollingDlg;}}>
        <Dialog.Header><i class="em em-checkered_flag" /> Bra kämpat! <i class="em em-champagne" /> <i class="em em-medal" /></Dialog.Header>
        <Dialog.Body>
          <p>Nu är alla konverteringar klara! Ditt färdiga dokument kan du nu ladda ned och föra över till K4-blanketten. Smidigt va?</p>
          <p>Om du tycker att detta hjälpte dig får du gärna skänka en slant via Swish: 0738 900 157!</p>
          <p>Tack för du använt K4 Krypto - vi ses om ett år igen! ;)</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.FooterButton accept={true}>Okej</Dialog.FooterButton>
        </Dialog.Footer>
      </Dialog>
    );
  }
}
