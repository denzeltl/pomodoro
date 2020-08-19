import React, { useContext } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { TimerContext } from '../context/TimerContext';

const FeaturesDisplay = () => {
    const { featureSessionTime, featureSessionName, showFeaturesDisplay } = useContext(TimerContext);
    momentDurationFormatSetup(moment);
    const formattedTime = moment.duration(featureSessionTime, 'seconds').format('h[h] mm[m] ss[s]');
    const splittedFormattedTime = formattedTime.split('').map((letter, i) => (parseInt(letter) === 0 || parseInt(letter) || letter === ' ' ? letter : <span key={i}>{letter}</span>));

    return (
        <div className={`display features-display ${showFeaturesDisplay ? 'show' : ''}`}>
            <p className="label">{featureSessionName}</p>
            <p className="timer">{splittedFormattedTime}</p>
        </div>
    );
};

export default React.memo(FeaturesDisplay);
