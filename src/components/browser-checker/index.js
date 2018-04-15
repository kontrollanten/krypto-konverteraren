import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';

export default class BrowserChecker extends Component {
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
          <Dialog.Header>Tjänsten stödjer bara webbläsaren Chrome</Dialog.Header>
          <Dialog.Body>
            <p>I dagsläget har vi tyvärr bara stöd för Chrome. Vi rekommenderar du <a href="https://www.google.com/chrome/" target="_blank">laddar ner Chrome</a> om du vill använda tjänstan.</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept={true}>Okej</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
