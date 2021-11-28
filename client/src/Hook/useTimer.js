import { useState, useRef } from 'react';

function sendWait (time) {
    let rest = sessionStorage.getItem('restaurant')
    console.log(rest)
    fetch('http://localhost:3001/recordTime', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"restaurant":rest,"timeDuration":time,},
    })
    let body = {"restaurant":rest,"timeDuration":time,}
    console.log(body)
}

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)
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

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}

export default useTimer