import moment from 'moment';

const validateDateColumns = (rows, dateIndex) => {
  const invariants = rows
    .map((row, index) => ({ date: row[dateIndex], rowNr: index + 1 }))
    .filter(row => !!row.date)
    .find(row => {
      const valid = moment(row.date).isValid();

      return !valid;
    });

  if (invariants) {
    return Error(`Rad ${invariants.rowNr} innehåller ett okänt datumformat.`);
  }

  return;
};

self.addEventListener('message', event => {
  const { rows, dateIndex } = event.data;
  const error = validateDateColumns(rows, dateIndex);

  if (error) {
    return self.postMessage(error.message);
  }

  self.postMessage(undefined);
});
