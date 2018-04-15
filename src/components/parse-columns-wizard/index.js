import { h } from 'preact';
import Icon from 'preact-material-components/Icon';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

import CurrencySelector from '../../containers/currency-selector';
import styles from './style.less';

export default ({
  currencies,
  currentKey,
  doneKeys,
  handleSelectCurrency,
  progress,
  onClickResolve,
  validating,
}) => {
  const steps = [
    {
      icon: 'date_range',
      desc: 'datum',
      key: 'date',
    },
    {
      icon: 'monetization_on',
      desc: 'belopp',
      key: 'amount',
    },
    {
      icon: 'attach_money',
      desc: 'valuta',
      key: 'currency',
    },
  ]
    .map((step, index) => ({ ...step, nr: index + 1 }))
    .map(step => ({
      ...step,
      className: [].concat(
        (step.nr / 3) <= progress && currentKey !== step.key ? styles.Done : '',
        (step.nr / 3) > progress && currentKey !== step.key ? styles.ToBeDone : '',
        currentKey === step.key ? styles.Current : ''
      ).join(' '),
    }));


  return (
    <div className={styles.Container}>
      <LinearProgress progress={progress} />
      <List>
        {steps.map(step => (
          <List.Item
            className={step.className}
          >
            <List.ItemGraphic>
              <Icon>{step.icon}</Icon>
            </List.ItemGraphic>
            Klicka på den kolumn som innehåller {step.desc}
            {step.key === currentKey && (
              <Button
                disabled={validating}
                onClick={onClickResolve}
                raised
                ripple
              >
                Klar
              </Button>
            )}
          </List.Item>
        ))}
      </List>

      {currentKey == 'currency' && (
        <Card>
          <div className={styles.CardHeader}>
            <h2 className="mdc-typography--title">Står inte valuta-namnet i tabellen?</h2>
            <p className="mdc-typography--caption">Om valuta-namnet inte står med i tabellen och alla transaktioner
              är gjorda med samma valuta kan du ange en statisk valuta.</p>

          </div>
            <Card.Actions>
              <CurrencySelector
                currencies={currencies}
                label="Välj en statisk valuta för samtliga transakationer"
                onChange={handleSelectCurrency}
              />
            </Card.Actions>
        </Card>
      )}
    </div>
  );
};

