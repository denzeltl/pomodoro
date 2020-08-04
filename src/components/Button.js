import React, { useContext } from 'react';
import playIcon from '../img/play_icon.svg';
import pauseIcon from '../img/pause_icon.svg';
import { TimerContext } from '../context/TimerContext';

const Button = () => {
    const { startTimer, currentlyRunning } = useContext(TimerContext);

    const handleClick = () => {
        startTimer();
    };

    return (
        <button className="play-pause" onClick={handleClick}>
            {currentlyRunning ? <img src={pauseIcon} alt="Pause Icon" /> : <img src={playIcon} alt="Play Icon" />}
        </button>
    );
};

export default Button;
