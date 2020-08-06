import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [focusLength, setFocusLength] = useState(5);
    const [breakLength, setBreakLength] = useState(3);
    const [sessionName, setSessionName] = useState('FOCUS');
    const [sessionTime, setSessionTime] = useState(focusLength);
    const [currentlyRunning, setCurrentlyRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [finishedTimer, setFinishedTimer] = useState(false);

    useEffect(() => {
        if (finishedTimer) {
            if (sessionName === 'FOCUS') {
                setSessionName('BREAK');
                setSessionTime(breakLength);
            } else if (sessionName === 'BREAK') {
                setSessionName('FOCUS');
                setSessionTime(focusLength);
            }
        }
        setFinishedTimer(false);
    }, [finishedTimer]);

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
                        return prevTime - 1;
                    }
                    setFinishedTimer(true);
                });
            }, 1000);
            setIntervalId(countdown);
        }
    };

    return <TimerContext.Provider value={{ sessionTime, startTimer, currentlyRunning, sessionName }}>{children}</TimerContext.Provider>;
};

export default TimerContextProvider;
