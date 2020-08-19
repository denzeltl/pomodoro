import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import audioCompletedFile from '../sounds/completed.mp3';
import audioStartFile from '../sounds/start.mp3';
import audioHydrateFile from '../sounds/splash.mp3';
import audioStretchFile from '../sounds/sitting.mp3';
import audioRestEyesFile from '../sounds/leaves.mp3';

const Sounds = () => {
    const { audioCompleted, audioStart, audioHydrate, audioStretch, audioRestEyes } = useContext(TimerContext);
    return (
        <>
            <audio ref={audioCompleted}>
                <source src={audioCompletedFile} type="audio/mpeg" />
            </audio>
            <audio ref={audioStart}>
                <source src={audioStartFile} type="audio/mpeg" />
            </audio>
            <audio ref={audioHydrate}>
                <source src={audioHydrateFile} type="audio/mpeg" />
            </audio>
            <audio ref={audioStretch}>
                <source src={audioStretchFile} type="audio/mpeg" />
            </audio>
            <audio ref={audioRestEyes}>
                <source src={audioRestEyesFile} type="audio/mpeg" />
            </audio>
        </>
    );
};

export default React.memo(Sounds);
