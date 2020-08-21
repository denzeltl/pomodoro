import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const FeaturesDisplay = () => {
    const { hydrateDisplayTime, hydrateDisplayName, showFeaturesDisplay, stretchDisplayName, stretchDisplayTime, restEyesDisplayName, restEyesDisplayTime } = useContext(TimerContext);

    return (
        <div className={`display features-display ${showFeaturesDisplay ? 'show' : ''}`}>
            {hydrateDisplayName && (
                <div className="features-display-item">
                    <p className="features-display-item-label">Hydrate</p>
                    <p className="features-display-item-timer">
                        {hydrateDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
            {stretchDisplayName && (
                <div className="features-display-item">
                    <p className="features-display-item-label">Stretch</p>
                    <p className="features-display-item-timer">
                        {stretchDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
            {restEyesDisplayName && (
                <div className="features-display-item">
                    <p className="features-display-item-label">Rest Eyes</p>
                    <p className="features-display-item-timer">
                        {restEyesDisplayTime}
                        <span>s</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default React.memo(FeaturesDisplay);
