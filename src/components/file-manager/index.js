import { h, Component } from 'preact';
import { Router } from 'preact-router';

import DropHandler from '../drop-handler';
import ParseColumns from '../parse-columns';
import ParseRows from '../../containers/parse-rows';
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
          headerRow={this.props.headerRow}
          onUpdateParseIndex={this.props.onUpdateParseIndex}
          onParseConfigFinished={this.props.onParseConfigFinished}
          onSetStaticToCurrency={this.props.onSetStaticToCurrency}
          parseIndexes={this.props.parseIndexes}
          staticToCurrency={this.props.staticToCurrency}
          unparsedResults={this.props.unparsedResults}
          validating={this.props.validating}
          validationErrorMessage={this.props.validationErrorMessage}
        />
        <ParseRows
          path={`${basePath}/:filename/tolka-rader`}
        />
        <ShowParsedFile
          path={`${basePath}/:filename`}
          headerRows={this.props.headerRow}
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
