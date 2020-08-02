import React from 'react';
import playIcon from '../img/play_icon.svg';

const Button = () => {
    return (
        <button className="play-pause">
            <img src={playIcon} alt="Play Icon" />
        </button>
    );
};

export default Button;
