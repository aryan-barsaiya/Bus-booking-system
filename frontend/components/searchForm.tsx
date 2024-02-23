"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextRouter } from "next/router";

interface Props {
  onSelectPlace: (
    selectedPlace: google.maps.places.PlaceResult | undefined
  ) => void;
}

interface FormData {
  source: string;
  destination: string;
  dateOfTravel: string;
}

const SearchForm: React.FC<Props> = ({ onSelectPlace }) => {
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const [options, setOptions] =
    useState<google.maps.places.AutocompletePrediction[]>();
  const [formData, setFormData] = useState<FormData>({
    source: "",
    destination: "",
    dateOfTravel: "",
  });

  const handleOnChange = (val: string, field: keyof FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: val,
    }));
    if (field === "source" || field === "destination") {
      if (!val.trim()) {
        setOptions([]);
        return;
      }

      loadOptions(val);
    }
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

  const searchQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:8000/api/findBuses", {
        source: formData.source,
        destination: formData.destination,
        date: formData.dateOfTravel,
      });
      console.log(response.data);
      if (response.data) {
        // Handle successful registration
        console.log("Buses fetched successfully");

        router.push(`/find-buses?buses=${JSON.stringify(response.data)}&source=${formData.source}&destination=${formData.destination}&date=${formData.dateOfTravel}`);
      } else {
        // Handle registration failure
        console.error("Failed to load buses");
      }
    } catch (error: any) {
      console.error("Error registering:", error?.message);
    }
  };

  return (
    <form onSubmit={searchQuery} >
      <div className="bg-red-950 p-10 items-center w-full flex justify-center  mt-16">
        <div className="flex justify-center">
          <div className="m-3">
            <input
              ref={inputEl}
              id="autocomplete"
              list="autocomplete-list"
              type="text"
              onChange={(event) => handleOnChange(event.target.value, "source")}
              className="border bg-gray-300 border-gray-300 rounded text-gray-950 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-lime-950"
              placeholder="Source"
            />
            <datalist id="autocomplete-list">
              {options?.map((option) => (
                <option key={option.place_id} value={option.description} />
              ))}
            </datalist>{" "}
          </div>

          <div className="m-3">
            <input
              ref={inputEl}
              id="autocomplete"
              list="autocomplete-list"
              type="text"
              onChange={(event) =>
                handleOnChange(event.target.value, "destination")
              }
              className="border border-gray-300 bg-gray-300 rounded text-gray-950 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-lime-950"
              placeholder="Destination"
            />
            <datalist id="autocomplete-list">
              {options?.map((option) => (
                <option key={option.place_id} value={option.description} />
              ))}
            </datalist>{" "}
          </div>

          <div className="m-3">
            <input
              type="date"
              className="form-controlborder border-gray-300 bg-gray-300 rounded text-gray-950 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-lime-950"
              // value={dateOfTravel}
              onChange={(e) => handleOnChange(e.target.value, "dateOfTravel")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="border-2 border-gray-600 bg-gray-400 rounded-sm p-2 w-32"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
