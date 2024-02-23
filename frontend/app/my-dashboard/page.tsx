"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Booking {
  userId: string;
  id: string;
  busName: string;
  source: string;
  destination: string;
  date: string;
  seatNumber: number;
}

const MyBookingsPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const [bookings, setBookings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("http://localhost:8000/api/mybookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: sessionData?.user.id }),
      });
      const bookings = (await response.json()).data;
      console.log(bookings);
      setIsFetching(true);
      try {
        // const response = await fetchUserBookings(); // Adjust API call based on your backend
        // const data = await response.json();
        setBookings(bookings);
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., display an error message to the user
      } finally {
        setIsFetching(false);
      }
    };

    fetchBookings();
  }, [sessionData?.user.id]);

  const handleCancelBooking = async (booking: Booking) => {
    console.log(booking.busId);
    const response = await fetch(`http://localhost:8000/api/cancelBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: sessionData?.user.id,
        busId: booking.busId,
        dt: booking.date,
      }),
    });
    const data = (await response.json()).data;
    console.log(data);
    setShowConfirmation(true);
    setBookingToDelete(booking);
  };

  const handleConfirmCancelBooking = async () => {
    setShowConfirmation(false);
    if (bookingToDelete) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingToDelete.id)
      );
    }
    window.location.reload();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setBookingToDelete(null);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold m-4">My Bookings</h2>
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <li key={booking.id} className="py-4 mx-10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{booking.busName}</h3>
                <p>{`${booking.source} to ${booking.destination}`}</p>
                <p>Date: {booking.date.split("T")[0]}</p>
                <p>Seat Number: {booking.SeatNumber}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleCancelBooking(booking)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="mb-4 text-black">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelConfirmation}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancelBooking}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
