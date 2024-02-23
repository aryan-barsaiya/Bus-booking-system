"use client";
import React, { useState, useEffect } from "react";
import { Bus, createBus } from "@/models/bus";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const InsideBusView: React.FC = () => {
  // console.log(currentBus);

  const [myBus, setMyBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const busId = searchParams.get("busId");
  const route = searchParams.get("route");
  const busName = searchParams.get("busName");
  const [booked, setBooked] = useState([]);
  console.log("route = ", route);
  useEffect(() => {
    console.log(myBus);
  }, [myBus]);
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/findBusDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ busId, date }),
          }
        );
        const data = (await response.json()).data;
        console.log(data);
        let seats: Array<{ seatNumber: number; value: number }> = [];
        for (let i = 0; i < 50; i++) {
          seats.push({ seatNumber: i, value: 0 });
        }
        data.forEach((booking: any) => {
          seats[booking.SeatNumber].value = 1;
        });
        console.log(data[0]);

        setMyBus({ busId: busId, seats: seats });

        if (!response.ok) {
          throw new Error("Failed to fetch bus data");
        }
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    };

    fetchBusData();
  }, []);

  function handleSeatClick(index: number) {
    console.log(index);
    const updatedBus = { ...myBus };
    const currentVal = updatedBus.seats[index].value;

    if (currentVal === 0) {
      updatedBus.seats[index].value = 2;
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, index]);
    } else if (currentVal === 2) {
      updatedBus.seats[index].value = 0;
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seatIndex) => seatIndex !== index)
      );
    }
    setMyBus(updatedBus);
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          width: "30%",
          position: "fixed",
          padding: "20px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Journey Details
        </h2>
        <div style={{ textAlign: "left", marginLeft: "65px" }}>
          <div>
            <span id="busName">Bus Name : {busName}</span>
            <br />
            <br />
            <span>Source: {source}</span>
            <br />
            <br />
            <span>Destination: {destination} </span>
            <br />
            <br />
            <span>Date: {date}</span>
            <br />
            <br />
            {/* <span>Arrival Time: </span> */}
            {/* <br /> */}
            <br />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "60%",
          marginLeft: "30%",
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f2f2f2",
        }}
      >
        {myBus &&
          myBus.seats
            .reduce((rows, seat, index) => {
              if (index % 5 === 0) rows.push([]);
              if (index % 5 === 3)
                rows[rows.length - 1].push(
                  <div key={`space-${index}`} style={{ width: "30px" }} />
                );
              rows[rows.length - 1].push(
                <div key={index}>
                  {seat.value === 0 ? (
                    <button onClick={() => handleSeatClick(index)}>
                      <img src="green-seat.png" alt="Empty Seat" />
                    </button>
                  ) : (
                    <button onClick={() => handleSeatClick(index)}>
                      <img src="red-seat.png" alt="Occupied Seat" />
                    </button>
                  )}
                </div>
              );
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex align-items-center m-2 ml-10px"
              >
                {row}
              </div>
            ))}
        {/* <button onClick={handleSeatBooking}>proceed</button> */}
        <Link
          href={{
            pathname: "/ticket-booking",
            query: {
              selectedSeats: selectedSeats,
              busId: busId,
              seatCount: selectedSeats.length,
              source: source,
              destination: destination,
              date: date,
              busName: busName,
            },
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Proceed
          </button>
        </Link>
      </div>
      <div style={{ width: "40%", padding: "20px", overflowY: "auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Booking Details
          </h2>
          <label htmlFor="selectedSeats">
            <b>Selected Seat Numbers:</b>
          </label>
          <span>
            {selectedSeats.map((seatNum) => ` ${seatNum + 1}`).join(", ")}
          </span>
          <br />
          <br />
          <label htmlFor="TotalFare">
            <b> Total Fare: </b>
            <span id="totalFare">{selectedSeats.length * 150}</span>
          </label>
        </div>
        {/* Add user details here */}
      </div>
    </div>
  );
};

export default InsideBusView;
