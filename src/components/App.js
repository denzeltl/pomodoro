import React, { useContext } from 'react';
import Container from './Container';
import { TimerContext } from '../context/TimerContext';

function App() {
    const { bgColor } = useContext(TimerContext);

    return (
        <div className="app" style={{ background: bgColor }}>
            <Container />
        </div>
    );
}

export default App;
