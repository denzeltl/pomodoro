import React, { useContext } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { TimerContext } from '../context/TimerContext';

const Display = () => {
    const { time } = useContext(TimerContext);
    momentDurationFormatSetup(moment);
    const formattedTime = moment.duration(time, 's').format('h:m:ss');

    return (
        <div className="display">
            <p className="label">POMODORO</p>
            <p className="timer">{formattedTime}</p>
        </div>
    );
};

export default Display;
