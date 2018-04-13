const validateColumns = rows => {
  const nrColumns = rows[0].length;
  const nrRows = rows.length;

  const invariants = rows
    .map((row, index) => ({ nrColumns: row.length, rowNr: index + 1 }))
    .filter(row => row.nrColumns !== nrColumns)
    .filter(row => row.rowNr !== nrRows)
    .pop();

  if (invariants) {
    return Error(`Rad ${invariants.rowNr} har inte samma antal kolumner som rad 1: ${invariants.nrColumns} vs ${nrColumns}.`);
  }

  return true;
};

self.addEventListener('message', event => {
  const rows = event.data;
  const error = validateColumns(rows);

  if (error) {
    return self.postMessage(error.message);
  }
  
  self.postMessage(undefined);
});

