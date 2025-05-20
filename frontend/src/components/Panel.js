import React from 'react';
import './Panel.css';

const Panel = ({ delayProbability }) => {
    return (
        <div className="panel">
            <h2>Delay Probability</h2>
            <p>{`Delay probability: ${Math.round(delayProbability * 100)}%`}</p>
        </div>
    );
};

export default Panel;