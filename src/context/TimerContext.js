import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [sessionTime, setSessionTime] = useState(10);
    const [currentlyRunning, setCurrentlyRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const startTimer = () => {
        setCurrentlyRunning(!currentlyRunning);

        if (currentlyRunning) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const countdown = setInterval(() => {
                if (sessionTime >= 0) {
                    setSessionTime((prevTime) => {
                        return prevTime - 1;
                    });
                }
            }, 1000);
            setIntervalId(countdown);
        }
    };

    return <TimerContext.Provider value={{ sessionTime, startTimer, currentlyRunning }}>{children}</TimerContext.Provider>;
};

export default TimerContextProvider;
