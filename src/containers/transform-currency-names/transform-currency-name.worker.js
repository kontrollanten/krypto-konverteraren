self.addEventListener('message', ({ data }) => {
  const {
    index,
    newValue,
    oldValue,
    rows,
  } = data;

  self.postMessage({
    rows: rows.map(row => 
      row.map((col, i) => i === index ? col.replace(oldValue, newValue) : col)
    ),
  });
});
