import { h } from 'preact';

import styles from './style.less';

export default ({
  headerRows = [],
  rows,
  selectedFields,
  onClick,
}) => (
  <table className={[styles.ParseTable].concat(onClick && styles.Clickable).join(' ')}>
    {headerRows
      .map(row => (
        <tr>{row.map(col => <th>{col}</th>)}</tr>
      ))}
    {rows
      .map((row, i) => (
        <tr key={i}>
          {row
            .map((field, index) => ({
              field,
              isSelected: selectedFields && selectedFields.indexOf(index) > -1,
            }))
            .map(({ field, isSelected }, index) => (
              <td
                key={index}
                className={isSelected ? styles.Selected : ''}
                data-index={index}
                onClick={onClick}
              >
                {field}
              </td>
            ))
          }
        </tr>)
      )}
  </table>
);
