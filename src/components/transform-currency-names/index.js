import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';
import Table from '../table';
import styles from './style.less';

export default class TransformCurrencyNames extends Component {
  constructor(props) {
    super(props);

    this.props.onGuessCurrencyNames({
      filename: this.props.filename,
      index: this.props.index,
      rows: this.props.rows,
    });

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

  handleTransformCurrencyName(match) {
    this.props.onTransformCurrencyName({
      filename: this.props.filename,
      index: this.props.index,
      oldValue: match.original,
      newValue: match.suggestion,
    });
  }

  render() {
    const convertSuggestions = this.props.matches.filter(match => !!match.suggestion);

    return (
      <Dialog ref={this.setElemRef} onAccept={this.props.onClose}>
        <Dialog.Header>Hantera felaktiga valutanamn</Dialog.Header>
        <Dialog.Body>
          <p>Alla kryptoplånböcker samt växlingssidor tillhandahåller tyvärr inte CSV-filer i maskinärt avläsbara format.</p>

          {convertSuggestions.length && (
            <p>Nedan har vi tagit fram förslag på förändring av valutanamnen, gå igenom dem och ändra de som stämmer.</p>
          )}

          <Table className={styles.Center}>
            <tr>
              <th>Originalvärde</th>
              <th>Föreslaget värde</th>
              <th></th>
            </tr>

            {convertSuggestions
                .map(match => ({
                  ...match,
                  disabled: this.props.transformed.indexOf(match.original) > -1 || this.props.currentlyTransforming === match.original,
                  label: this.props.currentlyTransforming === match.original ? 'Laddar' : 'Ändra',
                }))
                .map(match => (
                  <tr>
                    <td>{match.original}</td>
                    <td>{match.suggestion}</td>
                    <td>
                      <Button
                        { ...{ disabled: match.disabled } }
                        raised
                        ripple
                        onClick={this.handleTransformCurrencyName.bind(this, match)}
                      >
                        {match.label}
                      </Button>
                    </td>
                  </tr>
                ))}
          </Table>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.FooterButton accept>Okej</Dialog.FooterButton>
        </Dialog.Footer>
      </Dialog>
    );
  }
}

