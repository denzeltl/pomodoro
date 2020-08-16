import React, { createContext, useState, useEffect, useRef } from 'react';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const audioCompleted = useRef(null);
    const audioStart = useRef(null);
    const [focusLength, setFocusLength] = useState(1500);
    const [breakLength, setBreakLength] = useState(300);
    const [sessionName, setSessionName] = useState('FOCUS');
    const [sessionTime, setSessionTime] = useState(focusLength);
    const [currentlyRunning, setCurrentlyRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [finishedTimer, setFinishedTimer] = useState(false);
    const [readyCountdown, setReadyCountdown] = useState(false);

    useEffect(() => {
        if (finishedTimer) {
            if (sessionName === 'FOCUS') {
                audioCompleted.current.play();
                document.documentElement.style.setProperty('--bgColor', '#F9AB2C');
                setSessionName('BREAK');
                setSessionTime(breakLength);
            } else if (sessionName === 'BREAK' || sessionName === 'READY') {
                document.documentElement.style.setProperty('--bgColor', '#FF6D5A');
                setSessionName('FOCUS');
                setSessionTime(focusLength);
            }
        }
        setFinishedTimer(false);
    }, [finishedTimer, sessionName, breakLength, focusLength]);

    useEffect(() => {
        if (sessionName === 'BREAK' && sessionTime <= 5) {
            setSessionName('READY');
            audioStart.current.play();
        }
        setReadyCountdown(false);
    }, [readyCountdown, sessionName, sessionTime]);

    const startTimer = () => {
        setCurrentlyRunning(!currentlyRunning);

        if (currentlyRunning) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const countdown = setInterval(() => {
                setSessionTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    if (newPrevTime >= 0) {
                        setReadyCountdown(true);
                        return prevTime - 1;
                    }
                    setFinishedTimer(true);
                });
            }, 1000);
            setIntervalId(countdown);
        }
    };

    return (
        <TimerContext.Provider value={{ sessionTime, startTimer, currentlyRunning, sessionName, audioCompleted, audioStart, focusLength, breakLength, setFocusLength, setBreakLength, setSessionTime }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
