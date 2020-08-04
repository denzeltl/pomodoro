import React, { useContext } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { TimerContext } from '../context/TimerContext';

const Display = () => {
    const { sessionTime } = useContext(TimerContext);
    momentDurationFormatSetup(moment);
    const formattedTime = moment.duration(sessionTime, 's').format('h:m:ss');

    return (
        <div className="display">
            <p className="label">POMODORO</p>
            <p className="timer">{formattedTime}</p>
        </div>
    );
};

export default Display;
