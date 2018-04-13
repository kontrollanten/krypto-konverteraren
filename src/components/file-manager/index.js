import { h, Component } from 'preact';
import { Router } from 'preact-router';

import DropHandler from '../drop-handler';
import ParseColumns from '../parse-columns';
import ShowParsedFile from '../show-parsed-file';
import styles from './style.less';

export default class FileManager {
  render() {
    const basePath = '/'.concat(this.props.path.slice(1).split('/').shift());

    return (
      <Router>
        <ParseColumns
          path={`${basePath}/:filename/tolka-kolumner/:parseKey?`}
          currencies={this.props.currencies}
          onUpdateParseIndex={this.props.onUpdateParseIndex}
          onParseConfigFinished={this.props.onParseConfigFinished}
          onSetStaticToCurrency={this.props.onSetStaticToCurrency}
          parseIndexes={this.props.parseIndexes}
          staticToCurrency={this.props.staticToCurrency}
          unparsedResults={this.props.unparsedResults}
          validating={this.props.validating}
          validationErrorMessage={this.props.validationErrorMessage}
        />
        <ShowParsedFile
          path={`${basePath}/:filename`}
          nrExpectedResults={this.props.nrExpectedResults}
          onDownloadParsedResults={this.props.onDownloadParsedResults}
          parseErrorRows={this.props.parseErrorRows}
          parsedResults={this.props.parsedResults}
        />
        <DropHandler
          path={basePath}
          onSelectFile={this.props.onSelectFile}
        />
      </Router>
    );

    return (
      <div className={styles.Container}>Uppladdad fil: </div>
    );
  }
}
