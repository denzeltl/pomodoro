import React from 'react';
import Settings from './Settings';
import Main from './Main';
import Sounds from './Sounds';
import Mute from './Mute';

const Container = () => {
    return (
        <div className="container">
            <Mute />
            <Settings />
            <Main />
            <Sounds />
        </div>
    );
};

export default Container;
