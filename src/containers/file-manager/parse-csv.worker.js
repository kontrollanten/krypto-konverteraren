import Papa from 'papaparse';

const parseCsv = file => {
  return new Promise(resolve => {
    Papa.parse(file, {
      complete: results => resolve(results.data),
    });
  });
};

const removeUnknownCharacters = rows => {
  return rows
    .map(row => row.map(col => col.toString().replace(/[^\x20-\x7E]/g, '')));
};

self.addEventListener('message', event => {
  const { file } = event.data;

  parseCsv(file)
    .then(rows => removeUnknownCharacters(rows))
    .then(rows => {
      self.postMessage({ rows });
    });
});
