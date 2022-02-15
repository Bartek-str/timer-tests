import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

export const useCountDown = (seconds = 30) => {
  const [timeStarted, setTimeStarted] = useState(new Date().getTime())
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setTimeStarted(new Date().getTime())

    const timeout = setTimeout(() => setIsFinished(true), [seconds * 1000])

    const interval = setInterval(() => {
      setTimeLeft(Math.ceil(((seconds * 1000) - (new Date().getTime() - timeStarted)) / 1000))
      if (timeLeft === 0 || timeLeft < 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return {
    timeLeft,
    isFinished
  }
}

function App() {
  const { timeLeft, isFinished } = useCountDown(15)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
