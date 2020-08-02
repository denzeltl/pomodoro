import React from 'react';
import settingsIcon from '../img/settings_icon.svg';

const Settings = () => {
    return (
        <button className="settings">
            <img src={settingsIcon} alt="Settings Icon" />
        </button>
    );
};

export default Settings;
