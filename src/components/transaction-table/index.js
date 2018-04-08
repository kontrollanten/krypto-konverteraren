import { h } from 'preact';

import styles from './style.less';

export default ({
  rows,
  selectedFields,
  onClick,
}) => (
  <table className={[styles.ParseTable].concat(onClick && styles.Clickable).join(' ')}>
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
