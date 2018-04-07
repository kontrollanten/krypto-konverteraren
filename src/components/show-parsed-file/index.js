import { h, Component } from 'preact';

import styles from './style.less';

export default class ShowParsedFile extends Component {
  handleDownload() {
    this.props.onDownloadParsedResults();
  }

  render() {
    return (
      <div className={styles.Container}>
        {this.props.parsedResults.length === 0 &&
          <h1>Hämtar resultat för {this.props.filename}</h1>
        }
        {this.props.parsedResults.length > 0 &&
          <h1>Resultat för {this.props.filename}</h1>
        }

        <button
          onClick={this.handleDownload.bind(this)}
        >
          Ladda ner resultat
        </button>

        <table className={styles.ResultsTable}>
          {this.props.parsedResults
            .map((row, i) => (
              <tr key={i}>
                {row.map((field, index) => (
                  <td key={index}>
                    {field}
                  </td>
                ))}
              </tr>
            ))}
        </table>
      </div>
    );
  }
}
