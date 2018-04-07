import { h } from 'preact';

export default ({
  currencies,
  label,
  ...props,
}) => (
  <select {...props}>
    <option value="" disabled selected>{label}</option>
    {currencies
      .map(currency => <option value={currency.Symbol}>{currency.FullName}</option>)}
  </select>
);
