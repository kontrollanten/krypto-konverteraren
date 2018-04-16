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
  const { currencies } = event.data;

  self.postMessage({ currencies: sortCurrencies(currencies) });
});
