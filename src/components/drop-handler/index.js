import { h, Component } from 'preact';
import history from '../../history'; 
import styles from './style.less';

export default class DropHandler extends Component {
  state = {
    error: '',
    hovering: false,
    enterCounter: 0,
  };

  constructor(props) {
    super(props);

    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      error: '',
      hovering: true,
      enterCounter: this.state.enterCounter + 1,
    });
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragLeave(event) {
    this.setState({
      enterCounter: this.state.enterCounter - 1
    }, () => {
      if (this.state.enterCounter === 0) {
        this.setState({
          hovering: false,
        });
      }
    });
  }

  handleDrop(event) {
    event.preventDefault();
    this.handleDragLeave();
    const { files } = event.dataTransfer;
    const file = files[0]

    if (files.length > 1) {
      this.setState({
        error: 'Du kan bara ladda upp en fil i taget.',
      });
      return;
    }

    if (file.type !== 'text/csv') {
      this.setState({
        error: 'Filen är inte en CSV-fil.',
      });
      return;
    }

    this.props.onSelectFile(files[0]);

    history.push(this.props.path.concat('/', files[0].name, '/tolka/date'));
  }

  render() {
    return (
      <div
        className={styles.Container}
        ondragenter={this.handleDragEnter}
        ondragover={this.handleDragOver}
        ondragleave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div className={styles.Description}>
          <h1>Läs av växelkurs från en CSV-fil</h1>
          <p>Ladda upp en CSV-fil för att konvertera växelkursen för
            respektive rad.</p>
        </div>
        <div className={[styles.MessageBox].concat(this.state.hovering && styles.Active).join(' ')}>
          <strong>
            Släpp din fil här
          </strong>
          
          {this.state.error && <div className={styles.Error}>{this.state.error}</div>}
        </div>
      </div>
    );
  }
}
