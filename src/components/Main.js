import React from 'react';
import Display from './Display';
import Button from './Button';
import FeaturesDisplay from './FeaturesDisplay';

const Main = () => {
    return (
        <main className="main">
            <Display />
            <FeaturesDisplay />
            <Button />
        </main>
    );
};

export default Main;
