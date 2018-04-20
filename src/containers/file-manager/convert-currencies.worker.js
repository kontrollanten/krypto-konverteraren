import moment from 'moment';
import throat from 'throat';

const convertCurrencies = ({
  currencyIndex,
  dateIndex,
  rows,
  staticToCurrency,
  toCurrency,
}) => {
  const throttle = throat(10);

  return rows
    .map(row => ({
      row,
      response: throttle(fetchHistoricalValueForCurrency.bind(null, {
        fromCurrency: staticToCurrency || row[currencyIndex],
        date: row[dateIndex],
        toCurrency,
      }))
      .then(({ middlePrice }) => {
        if (isNaN(middlePrice)) {
          throw Error();
        }

        return middlePrice;
      })
    }));
};

const valueConvertCache = {};

const fetchHistoricalValueForCurrency = ({ fromCurrency, toCurrency, date }) => {
  const cacheKey = fromCurrency.concat(toCurrency, date);
  const cache = valueConvertCache[cacheKey];

  if (cache) {
    return cache;
  }

  const toTs = moment(date).unix();
  // CryptoCompare responds with the last two hours prices so we add one hour to our req
  const fromTs = moment(date).subtract(1, 'hour').unix();

  const value = fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${fromCurrency}&tsym=${toCurrency}&toTs=${fromTs}&extraParams=k4-krypto&limit=1`)
    .then(response => response.json())
    .then(jsonResponse => {
      const value = jsonResponse.Data
        .map(data => {
          return {
            ...data,
            middlePrice: (data.open + data.close) / 2,
          };
        })
        .reduce((prev, curr) => {
          return (Math.abs(curr.time - toTs) < Math.abs(prev.time - toTs) ? curr : prev);
        }, { time: 0 });

      return value;
    });

  valueConvertCache[cacheKey] = value;

  return value;
};


self.addEventListener('message', ({ data }) => {
  const {
    currencyIndex,
    dateIndex,
    rows,
    staticToCurrency,
    toCurrency,
  } = data;

  convertCurrencies({
    currencyIndex,
    dateIndex,
    rows,
    staticToCurrency,
    toCurrency,
  })
    .forEach(({ response, row }, index) => {
      response
        .then(middlePrice => {
          self.postMessage({
            index,
            middlePrice,
            row,
          });
        })
        .catch(error => {
          self.postMessage({
            errorMessage: error.message,
          });
        });
    });
});
