import './App.css'
import DisplayWeather from './DisplayWeather'

export default function App() {

  return (
    <>
      <div className="noWeather">
        <div id="error"></div>
      </div>

      <DisplayWeather />
    </>
  )
}