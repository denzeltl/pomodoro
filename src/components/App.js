import React from 'react';
import Settings from './Settings';
import Main from './Main';
import TimerContextProvider from '../context/TimerContext';

function App() {
    return (
        <div className="App">
            <TimerContextProvider>
                <Settings />
                <Main />
            </TimerContextProvider>
        </div>
    );
}

export default App;
