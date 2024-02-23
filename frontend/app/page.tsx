"use client";

import Image from "next/image";
import SearchForm from "@/components/searchForm";
import { useState } from "react";
import FaqSection from "@/components/faq";
import PartnerSection from "@/components/partners";

export default function Home() {
  const onSelectPlace = (
    selectedPlace: google.maps.places.PlaceResult | undefined
  ) => {
    console.log(selectedPlace);
  };


  return (
    <div>
      <div className="flex justify-evenly items-center m-5">
        <div className="text-center">
          <h1 className="text-4xl">
            Welcome to the Bus Booking System! <br />
          </h1>
          <p className="text-2xl">Book your bus tickets hassle-free.</p>
        </div>
        <div>
          <Image
            src="/bus-image.jpg"
            alt="Bus Image"
            width={500}
            height={300}
          />
        </div>
      </div>
      <SearchForm onSelectPlace={onSelectPlace} />
      <PartnerSection />
      <FaqSection />
    </div>
  );
}
