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
            At Madhava Silver, jewellery is more than just an accessory it’s a story of passion, heritage, and artistry. Born from a deep family tradition and an everlasting love for silver, our brand celebrates the timeless beauty of 925 Sterling Silver Jewellery crafted with care and authenticity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Our Story</h2>
              <p className="text-gray-600 font-light leading-relaxed">
              Based in Jaipur, the heart of India’s jewellery heritage, we specialize in handcrafted designs that blend modern trends with traditional elegance, offering everything from everyday classics to statement oxidized pieces. Our creations reflect the perfect balance of affordable luxury and lasting quality, designed for young fashion lovers, professionals, gifting seekers, and admirers of oxidized silver jewellery.

              Every piece at Madhava Silver is made with purity, trust, and sustainability at its heart. We take pride in preserving Indian artistry and tradition, while giving it a contemporary touch that resonates with today’s generation.

              With roots in Jaipur and a vision that extends across the globe, our mission is to make silver luxury accessible and to establish Madhava Silver as a trusted name in jewellery worldwide. Each design carries the soul of tradition, the sparkle of modernity, and the promise of timeless beauty.
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
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Sustainable practices and eco-friendly production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Blending cultural heritage with global fashion trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Affordability without compromising on quality</span>
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