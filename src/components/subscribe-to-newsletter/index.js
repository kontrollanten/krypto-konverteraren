import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import styles from './style.less';

export default class SusbcribeToNewsletter extends Component {
  render() {
    return (
      <div>
        <form
          className={styles.Container}i
          method="post"
          action="https://k4krypto.us18.list-manage.com/subscribe/post?u=da42a6e217341b71794dd101d&amp;id=02dd9d045b"
        >
          <TextField
            id="email"
            type="text"
            name="EMAIL"
            fullwidth={true}
            placeholder="E-postadress"
          />
          <Button
            className="mdc-theme--secondary-bg"
            type="submit"
            raised
            ripple
          >
            Anmäl
          </Button>
        </form>
      </div>
    );
  }
}
