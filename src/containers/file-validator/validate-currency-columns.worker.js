const fetchCurrencies = () => {
  return fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    .then(response => response.json())
    .then(jsonResponse => Object.values(jsonResponse.Data));
};

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
  const { rows, currencyIndex } = event.data;

  getInvalidRow(rows, currencyIndex)
    .then(row => {
      if (row) {
        return self.postMessage({ errorMessage: `Vi känner inte igen valutan ${row[currencyIndex]}` });
      }

      self.postMessage({});
    });
});
