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
    const [checkedHydrate, setCheckedHydrate] = useState(true);
    const [checkedStretch, setCheckedStretch] = useState(true);
    const [checkedRestEyes, setCheckedRestEyes] = useState(true);
    const [hydrateTime, setHydrateTime] = useState(10);
    const [hydrateId, setHydrateId] = useState(null);

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

    useEffect(() => {
        if (currentlyRunning && checkedHydrate) {
            const countdown = setInterval(() => {
                setHydrateTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    console.log(newPrevTime);
                    if (newPrevTime > 5) {
                        return prevTime - 1;
                    } else {
                        console.log('DRINK');
                        setHydrateTime(10);
                    }
                });
            }, 1000);
            setHydrateId(countdown);
        } else {
            console.log('cleanup');
            clearInterval(hydrateId);
            setHydrateId(null);
        }
    }, [currentlyRunning, checkedHydrate, checkedStretch, checkedRestEyes]);

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
        <TimerContext.Provider
            value={{
                sessionTime,
                startTimer,
                currentlyRunning,
                sessionName,
                audioCompleted,
                audioStart,
                focusLength,
                breakLength,
                setFocusLength,
                setBreakLength,
                setSessionTime,
                checkedHydrate,
                setCheckedHydrate,
                checkedStretch,
                setCheckedStretch,
                checkedRestEyes,
                setCheckedRestEyes,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
