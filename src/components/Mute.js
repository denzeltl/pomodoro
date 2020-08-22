import React, { useContext } from 'react';
import soundIcon from '../img/sound_icon.svg';
import muteIcon from '../img/mute_icon.svg';
import { TimerContext } from '../context/TimerContext';

const Settings = () => {
    const { muteButtonClick, isMuted } = useContext(TimerContext);

    return (
        <>
            <button className="mute" onClick={muteButtonClick}>
                {isMuted ? <img className="mute-true" src={muteIcon} alt="Mute Icon" /> : <img src={soundIcon} alt="Sound Icon" />}
            </button>
        </>
    );
};

export default React.memo(Settings);
