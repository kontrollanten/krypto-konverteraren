const createCurrencyStore = currencies => 
  currencies
    .reduce((out, currency) => {
      out[currency.Symbol] = true;

      return out;
    }, {});


const getInvalidRow = (rows, index) => {
  return fetchCurrencies()
    .then(currencies => createCurrencyStore(currencies))
    .then(currencyStore => {
      return rows
        .find(row => currencyStore[row[index]] !== true);
    });
};

self.addEventListener('message', event => {
  const {
    rows,
    currencies,
    currencyIndex,
  } = event.data;

  const currencyStore = createCurrencyStore(currencies);
  const invalidRow = rows.find(row => currencyStore[row[currencyIndex]] !== true);

  if (invalidRow) {
    return self.postMessage({ errorMessage: `Vi känner inte igen valutan ${invalidRow[currencyIndex]}` });
  }

  self.postMessage({});
});
