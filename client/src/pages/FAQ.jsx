import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "Is your jewellery real silver?",
      answer: "Yes! All our pieces are crafted in Sterling 925 Silver and come with quality assurance."
    },
    {
      question: "Will my jewellery tarnish over time?",
      answer: "Natural tarnishing (oxidation) is normal for real silver and not a defect. With proper care, your jewellery will retain its shine."
    },
    {
      question: "How should I care for my silver jewellery?",
      answer: "• Store in a soft pouch or airtight box.\n• Avoid moisture, perfumes, and chemicals.\n• Wear regularly to keep silver shining.\n• Clean with a soft polishing cloth (not tissues or abrasives).\n• Handle gemstones/pearls with extra care."
    },
    {
      question: "Do you ship across India?",
      answer: "Yes, we deliver across India. Average delivery time is 5–7 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, international shipping is not available from our website, but you can shop our collections on platforms like Amazon, Myntra, and Etsy."
    },
    {
      question: "Do you accept Cash on Delivery (COD)?",
      answer: "At present, COD is not supported. We will be adding this option in the future."
    },
    {
      question: "What if my product arrives damaged?",
      answer: "If your product is damaged or has a manufacturing defect, we offer a 7-day replacement warranty. Contact us within 7 days of delivery for assistance."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-black mb-4">Frequently Asked Questions</h1>
          <div className="w-24 h-1 mx-auto bg-gray-200 rounded-full mb-6" />
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our silver jewellery, shipping, care instructions, and more.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-black pr-4">{faq.question}</span>
                {openItems[index] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openItems[index] && (
                <div className="px-6 pb-4">
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a 
            href="mailto:info@madhava.com" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
