import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import audioCompletedFile from '../sounds/completed.mp3';
import audioStartFile from '../sounds/start.mp3';

const Sounds = () => {
    const { audioCompleted, audioStart } = useContext(TimerContext);
    return (
        <>
            <audio ref={audioCompleted}>
                <source src={audioCompletedFile} type="audio/mpeg" />
            </audio>
            <audio ref={audioStart}>
                <source src={audioStartFile} type="audio/mpeg" />
            </audio>
        </>
    );
};

export default Sounds;
