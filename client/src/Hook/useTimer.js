import { useState, useRef } from 'react';

async function sendWait (time) {
    let rest = sessionStorage.getItem('restaurant')
    console.log(rest)
    let body = {"restaurant":rest,"timeDuration":time,}
    console.log(body)
    let mtoken = sessionStorage.getItem('token');
    console.log(mtoken)
    let reco = await fetch('http://localhost:3001/user/recordTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret_token': mtoken,
      },
      body: JSON.stringify(body),
    })
    console.log(reco);
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