import React, { useState } from 'react';
import './Form.css';
import airports from '../data/airports'; // Adjust the path as necessary

const Form = ({ onSubmit }) => {
	// replace this state by two states, one for airport of origin, and one for airport of destination

	const [selectedOriginAirport, setSelectedOriginAirport] = useState('');
	const [selectedDestinationAirport, setSelectedDestinationAirport] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
			originAirportId: selectedOriginAirport, 
			destinationAirportId: selectedDestinationAirport,
			dayOfTheWeek: selectedDay,
		 });
    };

    const days = [
        { name: 'Monday', value: 1 },
        { name: 'Tuesday', value: 2 },
        { name: 'Wednesday', value: 3 },
        { name: 'Thursday', value: 4 },
        { name: 'Friday', value: 5 },
        { name: 'Saturday', value: 6 },
        { name: 'Sunday', value: 7 },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="airport">Departure from:</label>
            <select
                id="originAirport"
                value={selectedOriginAirport}
                onChange={(e) => setSelectedOriginAirport(e.target.value)}
            >
                <option value="">--Select an Airport--</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name}
                    </option>
                ))}
            </select>
			<label htmlFor="airport">Arrival to:</label>
			<select
                id="destinationAirport"
                value={selectedDestinationAirport}
                onChange={(e) => setSelectedDestinationAirport(e.target.value)}
            >
                <option value="">--Select an Airport--</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name}
                    </option>
                ))}
            </select>

            <label htmlFor="day">Select Day:</label>
            <select
                id="day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
            >
                <option value="">--Select a Day--</option>
                {days.map((day) => (
                    <option key={day.value} value={day.value}>
                        {day.name}
                    </option>
                ))}
            </select>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;