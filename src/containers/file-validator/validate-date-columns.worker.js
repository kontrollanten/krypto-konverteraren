import moment from 'moment';

const validateDateColumns = (rows, dateIndex) => {
  const invariants = rows
    .map((row, index) => ({ date: row[dateIndex], rowNr: index + 1 }))
    .filter(row => {
      const valid = moment(row.date).isValid();

      return !valid;
    })
    .pop();

  if (invariants) {
    return Error(`Rad ${invariants.rowNr} innehåller ett felaktigt datumformat.`);
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
