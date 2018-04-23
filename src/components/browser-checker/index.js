import { h, Component } from 'preact';

export default class BrowserChecker extends Component {
  render() {
    return (
      <div>
          <h2>Tjänsten stödjer bara webbläsaren Chrome</h2>
          <p>I dagsläget har vi tyvärr bara stöd för Chrome. Vi rekommenderar du <a href="https://www.google.com/chrome/" target="_blank">laddar ner Chrome</a> om du vill använda tjänstan.</p>
      </div>
    );
  }
}
