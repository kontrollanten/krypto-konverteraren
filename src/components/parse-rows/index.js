import { h, Component } from 'preact';
import ContentWrapper from '../content-wrapper';

export default class ParseRows extends Component {
  constructor(props) {
    super(props);

    // this.props.onAnalyzeEmptyRows(this.props.filename);
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Analysera raderna i {this.props.filename}</h1>
        {this.props.loading && <p>Analyserar filen.</p>}
      </ContentWrapper>
    );
  }
}
