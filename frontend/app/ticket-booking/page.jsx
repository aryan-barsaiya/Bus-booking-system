"use client"
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const BookingForm = () => {
  const {data} = useSession();
  const userId = data.user.id;
  const searchParams = useSearchParams();
  const selectedSeats = searchParams.getAll('selectedSeats');
  console.log(selectedSeats);
  const busId = searchParams.get('busId');
  const seatCount = searchParams.get('seatCount');
  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');
  const arrivalTime = searchParams.get('arrivalTime');
  const busName = searchParams.get('busName');
  console.log("bus id = ", busId);
  const [passengers, setPassengers] = useState(Array(Number(seatCount)).fill({ username: '', age: '', date: '' }));

  const handleInputChange = (index, event) => {
    console.log("hello");
    const { name, value } = event.target;
    console.log({ name, value });
    setPassengers(prevPassengers => {
      const newPassengers = [...prevPassengers];
      newPassengers[index] = { ...newPassengers[index], [name]: value };
      return newPassengers;
    });
  };
  const handleSubmit = async() => {
    console.log(busName);
    const response = await fetch(
      `http://localhost:8000/api/bookaseat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, seats: selectedSeats, busId: busId, dt: date, source:source, destination:destination}),
      }
    );
    const data = (await response.json()).data;
    console.log(data);
    window.alert("Booking Successful");
    window.location.href = "/my-dashboard";
    console.log("Bus Name:", busName);
    console.log("Passengers:", passengers);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '40%', position: 'fixed', padding: '20px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>Journey Details</h2>
        <div style={{ textAlign: 'left', marginLeft: '65px' }}>
          <div>
            <span id="busName">Bus Name : {busName}</span><br/><br />
            <span>Source: {source}</span><br/><br />
            <span>Date: {date}</span><br /><br />
            <label htmlFor="selectedSeats"><b>Selected Seat Numbers:</b></label>
            <span>{selectedSeats.map(seatNum => ` ${seatNum}`).join(', ')}</span><br /><br />
            <label htmlFor="TotalFare"><b> Total Fare: </b><span id='totalFare'>{selectedSeats.length * 150}</span></label>
          </div>

        </div>

      </div>
      <div style={{ width: '60%', marginLeft: '40%', padding: '20px', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Passenger Details</h2>
        {passengers.map((passenger, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3> <b>Passenger {index + 1}</b> </h3>
            <br />
            <div>
              <label htmlFor={`username-${index}`}>Name:</label>
              <input
                type="text"
                style={{ marginLeft: '8.5px' }}
                id={`username-${index}`}
                name={`username-${index}`}
                className='text-black'
                // value={passenger.username}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <br />
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '10px' }}>
                <label htmlFor={`age-${index}`}>Age:</label>
                <input
                  type="number"
                  style={{ marginLeft: '22.5px' }}
                  id={`age-${index}`}
                  name={`age-${index}`}
                  className='text-black'
                  // value={passenger.age}
                  onChange={(e) => handleInputChange(index, e)}
                />

              </div>
              <div>
                <label htmlFor={`gender-${index}`}>Gender:</label>

                <select onChange={(e) => handleInputChange(index, e)} className='text-black'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <br />
          </div>
        ))}
        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center' }}>
          Submit
        </button>

      </div>
    </div>
  );
};

export default BookingForm;
