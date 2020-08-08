import React from 'react';
import Settings from './Settings';
import Main from './Main';
import Sounds from './Sounds';

const Container = () => {
    return (
        <div className="container">
            <Settings />
            <Main />
            <Sounds />
        </div>
    );
};

export default Container;
