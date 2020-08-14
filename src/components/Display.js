import React, { useContext } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { TimerContext } from '../context/TimerContext';

const Display = () => {
    const { sessionTime, sessionName } = useContext(TimerContext);
    momentDurationFormatSetup(moment);
    const formattedTime = moment.duration(sessionTime, 's').format('h[h] m[m] ss[s]');

    return (
        <div className="display">
            <p className="label">{sessionName}</p>
            <p className="timer">{formattedTime}</p>
        </div>
    );
};

export default Display;
