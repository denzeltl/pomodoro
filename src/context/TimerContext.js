import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [time, setTime] = useState(1500);

    const startTimer = () => {
        setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);
    };

    return <TimerContext.Provider value={{ time, startTimer }}>{children}</TimerContext.Provider>;
};

export default TimerContextProvider;
