import Link from "next/link";
import React from "react";

const BusList = ({ buses, source, destination, date }) => {
  console.log(buses);
  buses.forEach((bus) => {
    (bus.noOfBookedSeats / bus.numberOfSeats) * 100 <= 60
      ? (bus.color = "bg-green-900")
      : (bus.noOfBookedSeats / bus.numberOfSeats) * 100 <= 90
      ? (bus.color = "bg-yellow-600")
      : (bus.color = "bg-red-700");
  });
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold m-10">Available Buses</h2>
      <div className="flex mb-8">
        <h5 className="text-sm mx-10">From: {source}</h5>
        <h5 className="text-sm mx-10">To: {destination}</h5>

        <h5 className="text-sm mx-10">On: {date}</h5>
      </div>
      <div className="text-center mb-4">
        <p className="text-gray-500">No. of Buses Available: {buses.length}</p>
      </div>

      <ul className="divide-y divide-gray-200">
        {buses.map((bus) => (
          <li key={bus._id} className={`py-4 ${bus.color}`}>
            <Link
              href={{
                pathname: "/bus",
                query: {
                  busId: bus._id,
                  source: source,
                  destination: destination,
                  date: date,
                  busName: bus.busName,
                  route: bus.route,
                },
              }}
            >
              <div className="flex justify-between items-center mx-10">
                <div>
                  <h3 className="text-xl">
                    {bus.busName}{" "}
                    {bus.route.map((station) => {
                      if (station.stationId === source) {
                        return (
                          <p key={station.stationId}>{station.arrivalTime}</p>
                        );
                      }
                    })}
                  </h3>
                  <p>
                    {bus.route.map((station) => station.stationId).join("->")}
                  </p>
                </div>
                <div className="flex">
                  {Object.entries(bus.dayOfOperation)
                    .filter(([day, isOperating]) => isOperating)
                    .map(([day, isOperating]) => (
                      <p key={day}>{isOperating ? day : ""}&nbsp;</p>
                    ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;
