import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const FeaturesDisplay = () => {
    const { hydrateDisplayTime, hydrateDisplayName, showFeaturesDisplay, stretchDisplayName, stretchDisplayTime, restEyesDisplayName, restEyesDisplayTime } = useContext(TimerContext);

    return (
        <div className={`display features-display ${showFeaturesDisplay ? 'show' : ''}`}>
            {hydrateDisplayName && (
                <div className="features-display-item">
                    <p className="label">{hydrateDisplayName}</p>
                    <p className="timer">
                        {hydrateDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
            {stretchDisplayName && (
                <div className="features-display-item">
                    <p className="label">{stretchDisplayName}</p>
                    <p className="timer">
                        {stretchDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
            {restEyesDisplayName && (
                <div className="features-display-item">
                    <p className="label">{restEyesDisplayName}</p>
                    <p className="timer">
                        {restEyesDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default React.memo(FeaturesDisplay);
