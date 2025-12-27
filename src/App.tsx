import { useState, type FormEvent } from 'react'
import './App.css'
import logoImg from './assets/gasoline.png'

interface ResultProps {
  title: string;
  gasoline: string | number;
  alcohol: string | number;
}

function App() {
  const [gasolineInput, setGasolineInput] = useState(1)
  const [alcoholInput, setAlcoholInput] = useState(1)
  const [result, setResult] = useState<ResultProps>()

  function Calculate(event: FormEvent) {
    event.preventDefault();

    let calculation = (alcoholInput) / (gasolineInput)

    if (calculation <= 0.7) {
      setResult({

        title: "Alcohol is more economical.",
        gasoline: formatCurrency(gasolineInput),
        alcohol: formatCurrency(alcoholInput)

      })
    } else if (
      gasolineInput == alcoholInput) {
      setResult({
        title: "The values are equal.",
        gasoline: formatCurrency(gasolineInput),
        alcohol: formatCurrency(alcoholInput)

      })
    }
    else {
      setResult({
        title: "Gasoline is more economical.",
        gasoline: formatCurrency(gasolineInput),
        alcohol: formatCurrency(alcoholInput)
      })
    }

  }

  function formatCurrency(value: number) {

    let formattedValue = value.toLocaleString("en-US",
      {
        style: 'currency',
        currency: 'USD'
      });

    return formattedValue;
  }

  return (
    <div>
      <main className='container'>
        <img src={logoImg} className='logo' />

        <h1 className='title'>What is the best option?</h1>

        <form className='form' >
          <label htmlFor="">Alcohol (Price per liter): </label>
          <input className='input' value={alcoholInput} onChange={(e) => setAlcoholInput(Number(e.target.value))} type='number' placeholder='ex: 4,90' min="1" step="0.01" required

          />
          <label htmlFor="">Gasoline (Price per liter): </label>
          <input className='input' value={gasolineInput} onChange={(e) => setGasolineInput(Number(e.target.value))} type='number' placeholder='ex: 4,90' min="1" step="0.01" required

          />
          <input className='button' type='submit' value="Calculate" onClick={Calculate} />
        </form>

        {result && Object.keys(result).length > 0 && (
          <section className='result'>
            <h2 className='result-title'>{result.title}</h2>

            <span>Alcohol: {result.alcohol}</span>
            <span>Gasoline: {result.gasoline}</span>

          </section>
        )}
      </main>
    </div>
  )
}

export default App