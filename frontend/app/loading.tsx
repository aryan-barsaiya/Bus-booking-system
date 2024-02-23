import React from "react";

const LoadingIcon: React.FC = () => {
  return (
    <div className="loading-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="5" r="0.1" />
      </svg>
    </div>
  );
};

export default LoadingIcon;
