import React from "react";

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-black mb-4">About Us</h1>
            <div className="w-24 h-1 mx-auto bg-gray-200 rounded-full mb-6" />
            <p className="text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Madhava Silver is dedicated to bringing you timeless, elegant jewellery crafted with passion and precision. Our mission is to make every moment shine with the perfect piece.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Our Story</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Founded by artisans with decades of experience, we blend traditional craftsmanship with modern design. Each piece is a testament to our commitment to quality, authenticity, and beauty.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Our Values</h2>
              <ul className="space-y-3 text-gray-600 font-light">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quality materials and ethical sourcing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Attention to detail in every design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Customer satisfaction above all</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Celebrating life's special moments</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/catalogue" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
            >
              Shop Our Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 