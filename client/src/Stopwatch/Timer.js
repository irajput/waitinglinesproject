import React from 'react';
import "./Stopwatch.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import useTimer from '../Hook/useTimer';
import { formatTime } from '../utils';

const element = <FontAwesomeIcon icon={faClock} />;

const Timer = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  return (
    <div className="Stopwatch">
      <h3>Check In and Check Out {element}</h3>
      <div className='stopwatch-card'>
        <p>{formatTime(timer)}</p>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Stop</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Timer;