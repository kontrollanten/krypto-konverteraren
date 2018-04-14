const getEmptyRows = rows => {
  return rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.find(col => col !== '') === undefined);
};

self.addEventListener('message', event => {
  const rows = event.data;

  self.postMessage({ suspects: getEmptyRows(rows) });
});

