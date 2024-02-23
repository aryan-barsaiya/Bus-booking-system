// Define the Seat model
export interface Seat {
    // Define properties of a seat
    seatNumber: number;
    value: number;
    // Add more properties as needed
  }
  
  // Define the Bus model
 export interface Bus {
    // Define properties of a bus
    busId: string;
    seats: Seat[]; // Array of Seat models
  }
  
  // Create a function to generate a new bus with seats
  export function createBus(busId: string): Bus {
    // Initialize an array to hold seats
    const seats: Seat[] = [];
  
    // Generate 15 seats and add them to the array
    for (let i = 1; i <= 45; i++) {
      seats.push({ seatNumber: i, value: 0 });
    }
  
    // Return the bus object with seats
    return {
      busId,
      seats,
    };
  }
  

