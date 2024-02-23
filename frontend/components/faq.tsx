import React, { useState } from "react";

const faqs = [
  {
    question: "How do I book a bus ticket?",
    answer:
      "You can book a bus ticket by visiting our website or mobile app and selecting your desired route, date, and time. Then, you can choose your seat and make the payment to confirm your booking.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, as well as digital payment methods like PayPal and Google Pay.",
  },
  {
    question: "Can I cancel my bus ticket?",
    answer:
      "Yes, you can cancel your bus ticket up to 24 hours before the scheduled departure time. However, cancellation fees may apply.",
  },
  {
    question: "What if my bus is delayed or cancelled?",
    answer:
      "If your bus is delayed or cancelled, we will notify you as soon as possible and provide you with alternative options or a refund.",
  },
  {
    question: "Do you offer discounts for group bookings?",
    answer:
      "Yes, we offer discounts for group bookings of 10 or more passengers. Please contact our customer support team for more information.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300 mb-4">
          <button
            className="flex justify-between items-center w-full py-4 px-6 bg-gray-300 hover:bg-gray-200 focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg font-medium text-gray-900">
              {faq.question}
            </span>
            <span className="text-gray-500">
              {activeIndex === index ? "-" : "+"}
            </span>
          </button>
          {activeIndex === index && (
            <div className="py-4 px-6 bg-gray-50">
              <p className="text-gray-700 bg-slate-100">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
