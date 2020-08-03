import React, { useContext } from 'react';
import playIcon from '../img/play_icon.svg';
import { TimerContext } from '../context/TimerContext';

const Button = () => {
    const { startTimer } = useContext(TimerContext);

    const handleClick = () => {
        startTimer();
    };

    return (
        <button className="play-pause" onClick={handleClick}>
            <img src={playIcon} alt="Play Icon" />
        </button>
    );
};

export default Button;
