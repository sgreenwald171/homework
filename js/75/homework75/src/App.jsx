import Address from './Address.jsx';
import './App.css'

function sayHi() {
  return 'Hello';
}

function App() {
  return (
    <>
      <h1>My Page!</h1>
      <h1>{sayHi()}</h1>

      <Address street="123 Main St" city="Lakewood" state="NJ" zip="08701"/>
    </>
  )
}

export default App
