import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Conversion from './Conversion';
import NoConversion from './NoConversion';

export default function App() {
  const [currencies, setcurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [rate, setRate] = useState(null);
  const [date, setDate] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const r = await fetch('https://api.frankfurter.dev/v1/currencies');
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`)
        }
        const c = await r.json();
        setcurrencies(Object.entries(c));
        
      } catch(e) {
        console.error('a error happened', e);
        setError(e.message)
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (from && to && (from !== to)) {
        try {
          setError(null);
          const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
          if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
          const result = await response.json();
          console.log(result.amount)
          setRate(result.rates[to]);
          console.log(result.date)
          setDate(result.date);
        } catch (e) {
          console.error('oops', e);
          setError(e.message);
          setRate(null);
        }
      }
      if (from && to && (from === to)) {
        setError(null);
        setRate(1);
        setDate(new Date().toISOString().split('T')[0])
      }
    })();
  }, [from, to])

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <>
      <Header />
      <input type='number' min={1} value={amount} onChange={e => setAmount(e.target.value)}/>
      from: <select value={from} onChange={e => setFrom(e.target.value)}>
        <option hidden>from</option>
        {currencies?.map(c => <option key={c[0]} value={c[0]}>{`${c[0]} - ${c[1]}`}</option>)}
      </select>
      <button type="button" onClick={handleSwap}>⇄</button>
      to: <select value={to} onChange={e => setTo(e.target.value)}>
        <option hidden>to</option>
        {currencies?.map(c => <option key={c[0]} value={c[0]} >{`${c[0]} - ${c[1]}`}</option>)}
      </select>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {rate ? (
        <Conversion rate={rate} amount={amount} from={from} to={to} date={date} />
      )
        :
      (
        <NoConversion />
      )}
    </>
  )
}
