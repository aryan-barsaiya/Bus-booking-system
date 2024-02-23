// pages/register.js
"use client";
import { useEffect, useState } from "react";
// import InputMoment from 'react-input-moment';
// import "react-input-moment/dist/input-moment.css";

export default function AddBus() {
  const [station, setStation] = useState({
    name: "",
    time: "",
  });

  const [options, setOptions] =
    useState<google.maps.places.AutocompletePrediction[]>();

  const [formData, setFormData] = useState({
    name: "",
    route: [],
    dayOfOperation: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    numberOfSeats: 50,
    phone: "",
    email: "",
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((pre) => {
      return {
        ...pre,
        dayOfOperation: { ...pre.dayOfOperation, [name]: checked },
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8000/api/admin/addbus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);

      if (response.ok) {
        // Handle successful registration
        alert("Bus Added successfully");
        console.log("Bus Added successfully");
      } else {
        alert("failed");
        // Handle registration failure
        console.error("failed");
      }
    } catch (error: any) {
      console.error("Error registering:", error.message);
    }
  };

  const addStation = () => {
    setFormData((pre) => {
      return {
        ...pre,
        route: [
          ...pre.route,
          { stationId: station.name, arrivalTime: station.time },
        ],
      };
    });
    setStation({
      name: "",
      time: "",
    });
  };

  // const updateStation = (index: any, field: any, value: any) => {
  //   const updatedStations = [...stations];
  //   updatedStations[index][field] = value;
  //   setStations(updatedStations);
  // };

  const handleOnChange = (e) => {
    let value = e.target.value;
    setStation((pre) => {
      return { ...pre, name: value };
    });
    if (!value.trim()) {
      setOptions([]);
      return;
    }
    loadOptions(value);
  };

  const loadOptions = (newVal: string) => {
    const autocompleteService =
      new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: newVal,
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          setOptions([]);
          return;
        }
        setOptions(predictions || []);
      }
    );
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-black p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Add bus</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label htmlFor="name" className="block mb-1">
              Bus Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="seats" className="block mb-1">
              Number of seats
            </label>
            <input
              type="number"
              id="numberOfSeats"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <label htmlFor="email" className="block mb-1">
            Days on Bus Travels
          </label>
          <div className="flex flex-wrap my-3">
            {Object.keys(formData.dayOfOperation).map((day) => {
              console.log(day, formData.dayOfOperation[day]);
              return (
                <div key={day} className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    name={day}
                    checked={formData.dayOfOperation[day]}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label htmlFor={day} className="ml-2">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              );
            })}
          </div>

          {/* added stations */}
          {formData.route.map((station, index) => (
            <div key={index}>
              <div className="mb-4">
                <label htmlFor="stationName" className="block mb-1">
                  Station Name
                </label>
                <input
                  type="text"
                  id="stationName"
                  name="stationName"
                  value={station.stationId}
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block mb-1">
                  Arrival Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={station.arrivalTime}
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
            </div>
          ))}
          {/* adding station form */}
          <div
            style={{
              border: "2px solid black",
              borderRadius: "8px",
              marginBottom: "12px",
              background: "grey",
              padding: "6px",
            }}
          >
            <div className="mb-4">
              <label htmlFor="stationName" className="block mb-1">
                Station Name
              </label>
              <input
                type="text"
                id="autocomplete"
                list="autocomplete-list"
                name="stationName"
                value={station.name}
                onChange={handleOnChange}
                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <datalist id="autocomplete-list">
                {options?.map((option) => (
                  <option key={option.place_id} value={option.description} />
                ))}
              </datalist>
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={station.time}
                onChange={(e) =>
                  setStation((pre) => {
                    return { ...pre, time: e.target.value };
                  })
                }
                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={addStation}
              className="w-full text-black bg-blue-500 text-white px-4 py-2 my-3 rounded-md hover:bg-blue-600 transition duration-300"
              type="button"
            >
              Add Station
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-black bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
}
