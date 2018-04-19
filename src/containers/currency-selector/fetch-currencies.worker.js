const fetchCurrencies = () => {
  return fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    .then(response => response.json())
    .then(jsonResponse => Object.values(jsonResponse.Data));
};

const sortCurrencies = currencies => {
  return currencies
    .sort((a, b) => {
      if (a.FullName < b.FullName) {
        return -1;
      }

      if (a.FullName > b.FullName) {
        return 1;
      }

      return 0;
    }); 
};

self.addEventListener('message', event => {
  fetchCurrencies()
    .then(currencies => {
      self.postMessage({ currencies: sortCurrencies(currencies) });
    })
    .catch(error => {
      self.postMessage({ error });
    });
});
