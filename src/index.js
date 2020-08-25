import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import TimerContextProvider from './context/TimerContext';

ReactDOM.render(
    <TimerContextProvider>
        <App />
    </TimerContextProvider>,
    document.getElementById('root')
);
