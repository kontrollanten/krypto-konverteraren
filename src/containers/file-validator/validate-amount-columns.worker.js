const validateAmountColumns = (rows, amountIndex) => {
  const invariants = rows
    .map((row, index) => ({ amount: row[amountIndex], rowNr: index + 1 }))
    .filter(row => isNaN(parseFloat(row.amount)))
    .shift();

  if (invariants) {
    return Error(`Rad ${invariants.rowNr} innehåller ett felaktigt beloppsformat.`);
  }

  return;
};

self.addEventListener('message', event => {
  const { rows, amountIndex } = event.data;
  const error = validateAmountColumns(rows, amountIndex);

  if (error) {
    return self.postMessage(error.message);
  }

  self.postMessage(undefined);
});
