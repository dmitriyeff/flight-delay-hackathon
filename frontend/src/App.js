import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Panel from './components/Panel';

function App() {
    const [delayProbability, setDelayProbability] = useState(null);

    const onSubmit = async ({ originAirportId, destinationAirportId, dayOfTheWeek }) => {
        try {
            const response = await fetch(`http://localhost:5000/predict?originAirportId=${originAirportId}&destinationAirportId=${destinationAirportId}&dayOfTheWeek=${dayOfTheWeek}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
			console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
			console.log(data);
            setDelayProbability(data.probability);
        } catch (error) {
            console.error('Error fetching delay probability:', error);
        }
    };

    return (
        <div className="App">
            <Form onSubmit={onSubmit} />
            {delayProbability !== null && <Panel delayProbability={delayProbability} />}
        </div>
    );
}

export default App;
