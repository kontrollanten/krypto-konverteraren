import { h } from 'preact';

import Table from '../table';
import styles from './style.less';

export default ({
  headerRows = [],
  label,
  rows,
  selectedFields,
  onClick,
}) => (
  <Table
    className={[styles.ParseTable].concat(onClick && styles.Clickable).join(' ')}
    label={label}
  >
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
  </Table>
);
