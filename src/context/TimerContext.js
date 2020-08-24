import React, { createContext, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const audioCompleted = useRef(null);
    const audioStart = useRef(null);
    const audioHydrate = useRef(null);
    const audioStretch = useRef(null);
    const audioRestEyes = useRef(null);
    const initialIsMuted = () => JSON.parse(window.localStorage.getItem('isMuted') || false);
    const [isMuted, setIsMuted] = useState(initialIsMuted);
    const initialFocusLength = () => JSON.parse(window.localStorage.getItem('focusLength') || 10);
    const [focusLength, setFocusLength] = useState(initialFocusLength);
    const initialBreakLength = () => JSON.parse(window.localStorage.getItem('breakLength') || 10);
    const [breakLength, setBreakLength] = useState(initialBreakLength);
    const [sessionName, setSessionName] = useState('FOCUS');
    const [sessionTime, setSessionTime] = useState(focusLength);
    const [currentlyRunning, setCurrentlyRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [finishedTimer, setFinishedTimer] = useState(false);
    const [readyCountdown, setReadyCountdown] = useState(false);
    const initialCheckedHydrate = () => JSON.parse(window.localStorage.getItem('checkedHydrate') || true);
    const [checkedHydrate, setCheckedHydrate] = useState(initialCheckedHydrate);
    const initialCheckedStretch = () => JSON.parse(window.localStorage.getItem('checkedStretch') || true);
    const [checkedStretch, setCheckedStretch] = useState(initialCheckedStretch);
    const initialCheckedRestEyes = () => JSON.parse(window.localStorage.getItem('checkedRestEyes') || true);
    const [checkedRestEyes, setCheckedRestEyes] = useState(initialCheckedRestEyes);
    const [showFeaturesDisplay, setShowFeaturesDisplay] = useState(false);
    const [hydrateTime, setHydrateTime] = useState(600);
    const [hydrateId, setHydrateId] = useState(null);
    const [hydrateTimeRunning, setHydrateTimeRunning] = useState(false);
    const [hydrateDisplayName, setHydrateDisplayName] = useState('');
    const [hydrateDisplayTime, setHydrateDisplayTime] = useState(null);
    const [stretchTime, setStretchTime] = useState(900);
    const [stretchId, setStretchId] = useState(null);
    const [stretchTimeRunning, setStretchTimeRunning] = useState(false);
    const [stretchDisplayName, setStretchDisplayName] = useState('');
    const [stretchDisplayTime, setStretchDisplayTime] = useState(null);
    const [restEyesTime, setRestEyesTime] = useState(1200);
    const [restEyesId, setRestEyesId] = useState(null);
    const [restEyesTimeRunning, setRestEyesTimeRunning] = useState(false);
    const [restEyesDisplayName, setRestEyesDisplayName] = useState('');
    const [restEyesDisplayTime, setRestEyesDisplayTime] = useState(null);

    // Change window title
    useEffect(() => {
        momentDurationFormatSetup(moment);
        const formattedTime = moment.duration(sessionTime, 'seconds').format('h[h] mm[m] ss[s]');
        const capitalizedName = sessionName.charAt(0).toUpperCase() + sessionName.slice(1).toLowerCase();

        if (currentlyRunning) {
            document.title = `${capitalizedName} | ${formattedTime}`;
        } else {
            document.title = 'Pomodoro Timer';
        }
    }, [currentlyRunning, sessionTime, sessionName]);

    // Save to LocalStorage
    useEffect(() => {
        if (isMuted) {
            window.localStorage.setItem('isMuted', true);
        } else if (!isMuted) {
            window.localStorage.setItem('isMuted', false);
        }

        if (checkedHydrate) {
            window.localStorage.setItem('checkedHydrate', true);
        } else if (!checkedHydrate) {
            window.localStorage.setItem('checkedHydrate', false);
        }

        if (checkedStretch) {
            window.localStorage.setItem('checkedStretch', true);
        } else if (!checkedStretch) {
            window.localStorage.setItem('checkedStretch', false);
        }

        if (checkedRestEyes) {
            window.localStorage.setItem('checkedRestEyes', true);
        } else if (!checkedRestEyes) {
            window.localStorage.setItem('checkedRestEyes', false);
        }
    }, [isMuted, checkedHydrate, checkedStretch, checkedRestEyes]);

    // Mute sounds
    useEffect(() => {
        if (isMuted) {
            audioCompleted.current.muted = true;
            audioStart.current.muted = true;
            audioHydrate.current.muted = true;
            audioStretch.current.muted = true;
            audioRestEyes.current.muted = true;
        } else if (!isMuted) {
            audioCompleted.current.muted = false;
            audioStart.current.muted = false;
            audioHydrate.current.muted = false;
            audioStretch.current.muted = false;
            audioRestEyes.current.muted = false;
        }
    }, [isMuted]);

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
            const countdown = setInterval(() => {
                setHydrateTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    if (newPrevTime < 6) {
                        document.documentElement.style.setProperty('--bgColor', '#1ABAD0');
                        setHydrateDisplayName('HYDRATE');
                        setHydrateDisplayTime(newPrevTime);
                        setShowFeaturesDisplay(true);
                        audioHydrate.current.play();
                        if (prevTime > 1) {
                            return prevTime - 1;
                        } else {
                            document.documentElement.style.setProperty('--bgColor', '#FF6D5A');
                            setHydrateDisplayName('');
                            setHydrateDisplayTime(null);
                            setShowFeaturesDisplay(false);
                            setHydrateTime(600);
                        }
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            setHydrateId(countdown);
        } else if (!currentlyRunning && checkedHydrate) {
            setHydrateTimeRunning(false);
        }
    }, [currentlyRunning, checkedHydrate]);

    // Timer for Stretch feature
    useEffect(() => {
        if (currentlyRunning && checkedStretch) {
            setStretchTimeRunning(true);
            const countdown = setInterval(() => {
                setStretchTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    if (newPrevTime < 11) {
                        document.documentElement.style.setProperty('--bgColor', '#B84FCA');
                        setStretchDisplayName('STRETCH');
                        setStretchDisplayTime(newPrevTime);
                        setShowFeaturesDisplay(true);
                        audioStretch.current.play();
                        if (prevTime > 1) {
                            return prevTime - 1;
                        } else {
                            document.documentElement.style.setProperty('--bgColor', '#FF6D5A');
                            setStretchDisplayName('');
                            setStretchDisplayTime(null);
                            setShowFeaturesDisplay(false);
                            setStretchTime(900);
                        }
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            setStretchId(countdown);
        } else if (!currentlyRunning && checkedStretch) {
            setStretchTimeRunning(false);
        }
    }, [currentlyRunning, checkedStretch]);

    // Timer for Rest Eyes feature
    useEffect(() => {
        if (currentlyRunning && checkedRestEyes) {
            setRestEyesTimeRunning(true);
            const countdown = setInterval(() => {
                setRestEyesTime((prevTime) => {
                    const newPrevTime = prevTime - 1;
                    if (newPrevTime < 21) {
                        document.documentElement.style.setProperty('--bgColor', '#7CAB3D');
                        setRestEyesDisplayName('REST EYES');
                        setRestEyesDisplayTime(newPrevTime);
                        setShowFeaturesDisplay(true);
                        audioRestEyes.current.play();
                        if (prevTime > 1) {
                            return prevTime - 1;
                        } else {
                            document.documentElement.style.setProperty('--bgColor', '#FF6D5A');
                            setShowFeaturesDisplay(false);
                            setRestEyesDisplayName('');
                            setRestEyesDisplayTime(null);
                            setRestEyesTime(1200);
                        }
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            setRestEyesId(countdown);
        } else if (!currentlyRunning && checkedRestEyes) {
            setRestEyesTimeRunning(false);
        }
    }, [currentlyRunning, checkedRestEyes]);

    // Check if features timer is running
    useEffect(() => {
        if (!hydrateTimeRunning) {
            clearInterval(hydrateId);
            setHydrateId(null);
        }
        if (!stretchTimeRunning) {
            clearInterval(stretchId);
            setStretchId(null);
        }
        if (!restEyesTimeRunning) {
            clearInterval(restEyesId);
            setRestEyesId(null);
        }
    }, [hydrateTimeRunning, hydrateId, stretchTimeRunning, stretchId, restEyesId, restEyesTimeRunning]);

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

    // Handle mute button click
    const muteButtonClick = () => {
        setIsMuted(!isMuted);
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
                hydrateDisplayName,
                hydrateDisplayTime,
                showFeaturesDisplay,
                hydrateTime,
                stretchTime,
                stretchDisplayName,
                stretchDisplayTime,
                restEyesTime,
                restEyesDisplayName,
                restEyesDisplayTime,
                muteButtonClick,
                isMuted,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
