import React, { useState } from 'react';
import Slider from 'react-input-slider';
import settingsIcon from '../img/settings_icon.svg';
import closeIcon from '../img/close_icon.svg';

const Settings = () => {
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    return (
        <>
            <button className="settings">
                <img src={settingsIcon} alt="Settings Icon" />
            </button>
            <div className="settings-overlay">
                <div className="settings-container">
                    <button className="close">
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                    <div className="slider">
                        <div className="slider-details">
                            <h3>Focus</h3>
                            <p>{focusDuration}</p>
                        </div>
                        <Slider axis="x" xstep={5} xmin={10} xmax={120} x={focusDuration} onChange={({ x }) => setFocusDuration(x)} />
                    </div>
                    <div className="slider">
                        <div className="slider-details">
                            <h3>Break</h3>
                            <p>{breakDuration}</p>
                        </div>
                        <Slider axis="x" xstep={1} xmin={1} xmax={30} x={breakDuration} onChange={({ x }) => setBreakDuration(x)} />
                    </div>
                    <div className="reminder">
                        <h2>Reminders</h2>
                        <div className="toggle">
                            <input className="toggle-switch" id="hydrate-switch" type="checkbox" />
                            <label className="toggle-label" htmlFor="hydrate-switch">
                                Hydrate
                            </label>
                        </div>
                        <div className="toggle">
                            <input className="toggle-switch" id="stretch-switch" type="checkbox" />
                            <label className="toggle-label" htmlFor="stretch-switch">
                                Stretch
                            </label>
                        </div>
                        <div className="toggle">
                            <input className="toggle-switch" id="eyes-switch" type="checkbox" />
                            <label className="toggle-label" htmlFor="eyes-switch">
                                Rest Eyes
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
