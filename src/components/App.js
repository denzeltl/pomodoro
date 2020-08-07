import React from 'react';
import Settings from './Settings';
import Main from './Main';
import Sounds from './Sounds';
import TimerContextProvider from '../context/TimerContext';

function App() {
    return (
        <div className="App">
            <TimerContextProvider>
                <Settings />
                <Main />
                <Sounds />
            </TimerContextProvider>
        </div>
    );
}

export default App;
