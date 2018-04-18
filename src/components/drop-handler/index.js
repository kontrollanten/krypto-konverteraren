import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import history from '../../history'; 
import ContentWrapper from '../content-wrapper';
import styles from './style.less';

export default class DropHandler extends Component {
  state = {
    error: '',
    filename: '',
    hasVerified: false,
    hovering: false,
    enterCounter: 0,
  };

  constructor(props) {
    super(props);

    this.handleClickVerify = this.handleClickVerify.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentWillUpdate(props, { filename, hasVerified }) {
    if (hasVerified && !!filename) {
      history.push(this.props.path.concat('/', filename, '/tolka-rader'));
    }
  }

  handleClickVerify() {
    this.setState({
      hasVerified: true,
    });
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
        error: `${file.name} är inte en CSV-fil.`,
      });
      return;
    }

    this.props.onSelectFile(files[0])
      .then(() => {
        this.setState({
          filename: files[0].name,
        });
      });
  }

  render() {
    return (
      <ContentWrapper
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
          <div className={styles.Filename}>
            <strong>
              {this.state.filename ? this.state.filename : 'Släpp din fil här'}
            </strong>
          </div>
          
          <p className={styles.PrivacyInfo}>All information filen stannar i din webbläsare, ingenting skickas till våra, eller någon annans, servrar.</p>
          {this.state.error && <div className={styles.Error}>{this.state.error}</div>}
        </div>

        <div className={styles.Confirmation}>
          <p>K4 Krypto tar inget ansvar för uppgifterna som genereras i detta verktyg. Detta ska ses som hjälp för att underlätta deklareringen men inte som ett heltäckande eller en giltig referens. Användaren är själv ansvarig för de uppgifter som lämnas till Skatteverket samt på vilket sätt användaren är skyldig att lämna sin deklaration. <a href="/ansvar-och-villkor">Läs mer under ansvar och villkor.</a></p>
          <div>
            <Button
              disabled={this.state.hasVerified}
              onClick={this.handleClickVerify}
              raised
              ripple
            >
              Jag förstår
            </Button>
          </div>
        </div>
      </ContentWrapper>
    );
  }
}
