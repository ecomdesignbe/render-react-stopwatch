import React, { useState, useEffect } from 'react'
import './style.css'

const Stopwatch = () => {
    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(false)
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let interval
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 10)
        }
        return () => clearInterval(interval)
    }, [running])

    const startPauseHandler = () => {
        setRunning(!running)
    }

    const resetHandler = () => {
        setTime(0)
        setRunning(false)
        setLaps([])
    }
    
    const lapHandler = () => {
        setLaps([...laps, time])
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 6000);
        const seconds = Math.floor((time % 6000) / 100)
        const centiseconds = time % 100;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`
    }

    return (
        <div>
        <h1>Stopwatch</h1>
        <div>{formatTime(time)}</div>
        <button onClick={startPauseHandler}>
            {running ? 'Pause' : time === 0 ? 'Start' : 'Resume'}
        </button>
        <button onClick={resetHandler} disabled={time === 0 && !running}>Reset</button>
        <button onClick={lapHandler} disabled={!running}>Lap</button>
        <ul>
            {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
            ))}
        </ul>
        </div>
    )
}

export default Stopwatch