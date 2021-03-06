import moment from 'moment';
import throat from 'throat';

const throttle = throat(10);
const convertCurrencies = ({
  currencyIndex,
  dateIndex,
  rows,
  staticToCurrency,
  toCurrency,
}) => {
  let rateLimitExceeded = false;
  const rateLimitVerify = options => {
    if (rateLimitExceeded) {
      throw Error();
    }

    return fetchHistoricalValueForCurrency(options);
  };

  return rows
    .map(row => ({
      row,
      response: throttle(rateLimitVerify.bind(null, {
        fromCurrency: staticToCurrency || row[currencyIndex],
        date: row[dateIndex],
        toCurrency,
      }))
      .catch(error => {
        if (error.type === 99) {
          rateLimitExceeded = true;
        }

        throw error;
      })
      .then(({ middlePrice }) => {
        if (isNaN(middlePrice)) {
          throw Error('Ett okänt fel uppstod.');
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
      if (jsonResponse.Response === 'Error') {
        const error = Error(jsonResponse.Message);
        error.type = jsonResponse.Type;

        throw error;
      }

      return jsonResponse;
    })
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
            index,
          });
        });
    });
});
