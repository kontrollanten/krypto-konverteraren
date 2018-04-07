import { h, Component } from 'preact';
import history from '../../history';

import styles from './style.less';

export default class ParseFile extends Component {
  state = {
    currentParseKey: '',
    currentParseKeyHuman: '',
  };
 
  constructor(props) {
    super(props);

    this.handleClickColumn = this.handleClickColumn.bind(this);

    this.setCurrentParseKey('date');
  }

  componentWillReceiveProps({ parseIndexes }) {
    switch(true) {
      case parseIndexes.date === null:
        this.setCurrentParseKey('date');
        break;
      case parseIndexes.currency === null:
        this.setCurrentParseKey('currency');
        break;
      case parseIndexes.amount === null:
        this.setCurrentParseKey('amount');
        break;
      default:
        this.props.onParseConfigFinished();
        const nextPath = this.props.url.split('/').filter(section => section !== 'tolka').join('/');
        history.push(nextPath);
    }
  }

  handleClickColumn(event) {
    const index = event.target.getAttribute('data-index');

    this.props.onUpdateParseIndex({
      index,
      key: this.state.currentParseKey,
    });
  }

  setCurrentParseKey(key) {
    switch(key) {
      case 'date':
        return this.setState({
          currentParseKey: 'date',
          currentParseKeyHuman: 'datum',
        });

      case 'currency':
        return this.setState({
          currentParseKey: 'currency',
          currentParseKeyHuman: 'valutanamnet',
        });
      case 'amount':
        return this.setState({
          currentParseKey: 'amount',
          currentParseKeyHuman: 'transaktionsbelopp',
        });
    }
  }

  render() {
    return (
      <div className={styles.Container}>
        <h1>Tolka filen {this.props.filename}</h1>

        <div className={styles.description}>
          <h2>Klicka på det fält som innehåller {this.state.currentParseKeyHuman}</h2>
        </div>

        <table className={styles.ParseTable}>
          {this.props.unparsedResults
            .map((row, i) => (
              <tr key={i}>{row
                .map((field, index) => <td key={index} data-index={index} onClick={this.handleClickColumn}>{field}</td>)}
              </tr>)
            )}
        </table>
      </div>
    );
  }
}
