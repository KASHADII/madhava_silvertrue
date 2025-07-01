import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#fff] flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg border border-[#f5e7c5] p-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-[#D4AF37] mb-4">About Us</h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#D4AF37] to-[#fffbe6] rounded-full mb-4" />
          <p className="text-lg text-gray-700">Madhava Silver is dedicated to bringing you timeless, elegant jewellery crafted with passion and precision. Our mission is to make every moment shine with the perfect piece.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-2">Our Story</h2>
          <p className="text-gray-700">Founded by artisans with decades of experience, we blend traditional craftsmanship with modern design. Each piece is a testament to our commitment to quality, authenticity, and beauty.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Quality materials and ethical sourcing</li>
            <li>Attention to detail in every design</li>
            <li>Customer satisfaction above all</li>
            <li>Celebrating life's special moments</li>
          </ul>
        </div>
        <div className="text-center mt-8">
          <a href="/catalogue" className="inline-block px-8 py-3 bg-[#D4AF37] text-white rounded-full font-semibold shadow-lg hover:bg-[#bfa133] transition">Shop Our Collection</a>
        </div>
      </div>
    </div>
  );
};

export default About; 