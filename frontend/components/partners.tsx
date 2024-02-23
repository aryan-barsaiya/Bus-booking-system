import React from "react";

const partners = [
  {
    name: "Hind Travels",
  },
  {
    name: "Konduskar Travels",
  },
  {
    name: "VRL Travels",
  },
  {
    name: "Shrinath Travels",
  },
  {
    name: "Neeta Travels",
  },
  {
    name: "Volvo Bus Service",
  },
  {
    name: "Raman service",
  },
  {
    name: "Kundan service",
  },
  {
    name: "Rohit service",
  },
  {
    name: "Little hritik service",
  },
  {
    name: "Aryan service",
  },
  {
    name: "Om sai ram travels",
  },
  {
    name: "Balaji service",
  },
];

const PartnerSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8">Our Bus Travel Partners</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-spacing-1 border-2 border-gray-300 p-4"
          >
            {partner.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;
