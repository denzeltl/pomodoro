import React, { useState } from 'react';
import Slider from 'react-input-slider';
import settingsIcon from '../img/settings_icon.svg';
import closeIcon from '../img/close_icon.svg';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const Settings = () => {
    const [focusDuration, setFocusDuration] = useState(1500);
    const [breakDuration, setBreakDuration] = useState(300);
    const [show, setShow] = useState(false);
    momentDurationFormatSetup(moment);
    const formattedFocusTime = moment.duration(focusDuration, 's').format('h [hrs] m [mins]');
    const formattedBreakTime = moment.duration(breakDuration, 's').format('m [mins]');

    const showSettings = () => {
        setShow(true);
    };

    const hideSettings = () => {
        setShow(false);
    };

    return (
        <>
            <button className="settings" onClick={showSettings}>
                <img src={settingsIcon} alt="Settings Icon" />
            </button>
            <div
                className={`settings-overlay ${show && 'show'}`}
                onClick={(e) => {
                    if (e.target.classList.contains('settings-overlay')) {
                        hideSettings();
                    }
                }}
            >
                <div className="settings-container">
                    <button className="close" onClick={hideSettings}>
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                    <div className="slider">
                        <div className="slider-details">
                            <h3>Focus</h3>
                            <p>{formattedFocusTime}</p>
                        </div>
                        <Slider axis="x" xstep={300} xmin={300} xmax={7200} x={focusDuration} onChange={({ x }) => setFocusDuration(x)} />
                    </div>
                    <div className="slider">
                        <div className="slider-details">
                            <h3>Break</h3>
                            <p>{formattedBreakTime}</p>
                        </div>
                        <Slider axis="x" xstep={60} xmin={60} xmax={1800} x={breakDuration} onChange={({ x }) => setBreakDuration(x)} />
                    </div>
                    <div className="reminder">
                        <h2>Reminders</h2>
                        <div className="toggle">
                            <label className="toggle-label" htmlFor="hydrate-switch">
                                <input className="toggle-switch" id="hydrate-switch" type="checkbox" />
                                <span className="toggle-button" />
                                <p className="toggle-desc">Hydrate</p>
                            </label>
                        </div>
                        <div className="toggle">
                            <label className="toggle-label" htmlFor="stretch-switch">
                                <input className="toggle-switch" id="stretch-switch" type="checkbox" />
                                <span className="toggle-button" />
                                <p className="toggle-desc">Stretch</p>
                            </label>
                        </div>
                        <div className="toggle">
                            <label className="toggle-label" htmlFor="eyes-switch">
                                <input className="toggle-switch" id="eyes-switch" type="checkbox" />
                                <span className="toggle-button" />
                                <p className="toggle-desc">Rest Eyes</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
