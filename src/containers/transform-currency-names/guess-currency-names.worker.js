const createCurrencyStore = currencies => 
  currencies
    .reduce((out, currency) => {
      out[currency.Symbol] = true;

      return out;
    }, {});

const getUniqueCurrenciesFromRows = (rows, index) => 
  Object.keys(
    rows
      .reduce((obj, row) => ({ ...obj, [row[index]]: true }), {})
  );

self.addEventListener('message', ({ data }) => {
  const { currencies, index, rows } = data;
  const currencyStore = createCurrencyStore(currencies);
  const uniqueImportCurrencies = getUniqueCurrenciesFromRows(rows, index);

  const matches = uniqueImportCurrencies
    .filter(currency => currencyStore[currency] !== true)
    .map(currency => ({
      original: currency,
      suggestion: currencyStore[currency.slice(1)] && currency.slice(1),
    }));

  self.postMessage({
    matches,
  });
});
