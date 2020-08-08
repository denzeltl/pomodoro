import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import TimerContextProvider from './context/TimerContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <TimerContextProvider>
        <App />
    </TimerContextProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
