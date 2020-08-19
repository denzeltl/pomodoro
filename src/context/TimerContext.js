import React, { createContext, useState, useEffect, useRef } from 'react';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const audioCompleted = useRef(null);
    const audioStart = useRef(null);
    const audioHydrate = useRef(null);
    const audioStretch = useRef(null);
    const audioRestEyes = useRef(null);
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
    const [showFeaturesDisplay, setShowFeaturesDisplay] = useState(false);
    const [hydrateTime, setHydrateTime] = useState(10);
    const [hydrateId, setHydrateId] = useState(null);
    const [hydrateTimeRunning, setHydrateTimeRunning] = useState(false);
    const [featureSessionName, setFeatureSessionName] = useState('');
    const [featureSessionTime, setFeatureSessionTime] = useState(null);

    // Change from Focus and Break
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

    // Change from Break to Focus
    useEffect(() => {
        if (sessionName === 'BREAK' && sessionTime <= 5) {
            setSessionName('READY');
            audioStart.current.play();
        }
        setReadyCountdown(false);
    }, [readyCountdown, sessionName, sessionTime]);

    // Timer for Hydrate feature
    useEffect(() => {
        if (currentlyRunning && checkedHydrate) {
            setHydrateTimeRunning(true);
            const hydrateCountdown = setInterval(() => {
                setHydrateTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    if (newPrevTime < 6) {
                        document.documentElement.style.setProperty('--bgColor', '#1ABAD0');
                        setFeatureSessionName('DRINK');
                        setFeatureSessionTime(newPrevTime);
                        setShowFeaturesDisplay(true);
                        audioHydrate.current.play();
                        if (prevTime > 1) {
                            return prevTime - 1;
                        } else {
                            document.documentElement.style.setProperty('--bgColor', '#FF6D5A');
                            setFeatureSessionName('');
                            setFeatureSessionTime(null);
                            setShowFeaturesDisplay(false);
                            setHydrateTime(10);
                        }
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            setHydrateId(hydrateCountdown);
        } else if (!currentlyRunning && checkedHydrate) {
            setHydrateTimeRunning(false);
        }
    }, [currentlyRunning, checkedHydrate]);

    // Check if features timer is running
    useEffect(() => {
        if (!hydrateTimeRunning) {
            clearInterval(hydrateId);
            setHydrateId(null);
        }
    }, [hydrateTimeRunning, hydrateId]);

    // Start timer
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
                audioHydrate,
                audioStretch,
                audioRestEyes,
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
                featureSessionName,
                featureSessionTime,
                showFeaturesDisplay,
                hydrateTime,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
