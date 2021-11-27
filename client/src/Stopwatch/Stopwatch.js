import React, { useState } from 'react';
import './Stopwatch.css';

function sendWait (time) {

}

const Stopwatch = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)

  const handleStart = () => {
    // start button logic here
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    // Pause button logic here
    clearInterval(countRef.current)
    setIsPaused(false)
    sendWait(timer)
  }

  const handleResume = () => {
    // Resume button logic here
    setIsPaused(true)
    countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000)
  }

  const handleReset = () => {
    // Reset button logic here
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  return (
    <div className="Stopwatch">
      <h3>React Stopwatch</h3>
      <div className='stopwatch-card'>
        <p>{timer}</p> {/* here we will show timer */}
        <div className='buttons'>
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Stop</button>
          <button onClick={handleResume}>Resume</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;