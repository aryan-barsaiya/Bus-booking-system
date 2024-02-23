import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 fixed bottom-0 w-full mt-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-gray-100">Copyright © Explore the World</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-100 hover:text-gray-800">
              Top
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-100 hover:text-gray-800">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-100 hover:text-gray-800">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
