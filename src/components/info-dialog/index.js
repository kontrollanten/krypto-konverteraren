import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';

export default class InfoDialog extends Component {
  constructor(props) {
    super(props);

    this.setElemRef = this.setElemRef.bind(this);
  }

  componentDidMount() {
    this.elemRef.MDComponent.show();
  }

  setElemRef(elem) {
    if (!this.elemRef) {
      this.elemRef = elem;
    }
  }

  render() {
    return (
      <div>
        <Dialog ref={this.setElemRef}>
          <Dialog.Header>Skatteverket har uppdaterat reglerna rörande deklaration av kryptohandel</Dialog.Header>
          <Dialog.Body>
            <p>
              Den 20 april ändrade Skatteverket reglerna gällande deklaration av handel med kryptohandel. 
              Enligt de nya reglerna är det inte längre något krav att redovisa varje enskild transaktion och dess värde i SEK. 
              &nbsp;<a href="https://www.skatteverket.se/omoss/press/pressmeddelanden/2018/2018/deklareraforsaljningavvardepapperochkryptovalutordigitalt.5.41f1c61d16193087d7f12e4d.html" target="_blank">
                Klicka här för att läsa Skatteverkets pressmeddelande.
              </a>
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept={true}>Okej</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
