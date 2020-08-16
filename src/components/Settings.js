import React, { useState, useContext } from 'react';
import Slider from 'react-input-slider';
import settingsIcon from '../img/settings_icon.svg';
import closeIcon from '../img/close_icon.svg';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { TimerContext } from '../context/TimerContext';

const Settings = () => {
    const { focusLength, breakLength, setFocusLength, setBreakLength, setSessionTime } = useContext(TimerContext);
    const [show, setShow] = useState(false);
    momentDurationFormatSetup(moment);
    const formattedFocusTime = moment.duration(focusLength, 'seconds').format('h [hrs] m [mins]');
    const formattedBreakTime = moment.duration(breakLength, 'seconds').format('m [mins]');

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
                        <Slider
                            axis="x"
                            xstep={300}
                            xmin={300}
                            xmax={7200}
                            x={focusLength}
                            onChange={({ x }) => {
                                setSessionTime(x);
                                setFocusLength(x);
                            }}
                        />
                    </div>
                    <div className="slider">
                        <div className="slider-details">
                            <h3>Break</h3>
                            <p>{formattedBreakTime}</p>
                        </div>
                        <Slider axis="x" xstep={60} xmin={60} xmax={1800} x={breakLength} onChange={({ x }) => setBreakLength(x)} />
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
