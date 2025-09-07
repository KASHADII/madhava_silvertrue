import React, { useEffect, useState } from "react";
import ProductCard from "@/components/custom/ProductCard";
import BestSellers from "@/components/custom/BestSellers";
import axios from "axios";
import { ChevronRight, ArrowRight, Play } from "lucide-react";

const Home = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-products?page=1&limit=4");
      const data = await res.data;
      setRecentProducts(data.data || []);
    };
    fetchRecentProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - Cartier Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=1200"
          alt="Luxury Jewelry"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-tight">
            Timeless
            <span className="block font-medium">Elegance</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of fine jewelry.
          </p>
          
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
          >
            Discover Collection
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Second Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=1200"
          alt="Classic Earrings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Classic
            <span className="block font-medium">Earrings</span>
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Refined elegance that speaks volumes.
          </p>
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Designs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Third Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&w=1200"
          alt="Statement Rings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Statement
            <span className="block font-medium">Rings</span>
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Bold statements for the confident woman.
          </p>
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
          >
            View Collection
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Fourth Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3641055/pexels-photo-3641055.jpeg?auto=compress&w=1200"
          alt="Luxury Bracelets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Luxury
            <span className="block font-medium">Bracelets</span>
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Sophisticated charm for your wrist.
          </p>
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Featured Collections Grid - Cartier Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">Signature Collections</h2>
            <p className="text-gray-600 font-light">Each piece is a testament to our commitment to excellence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=600"
                  alt="Elegant Necklaces"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-light text-white mb-2">Elegant Necklaces</h3>
                <p className="text-white/80 font-light">Timeless sophistication</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=600"
                  alt="Classic Earrings"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-light text-white mb-2">Classic Earrings</h3>
                <p className="text-white/80 font-light">Refined elegance</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&w=600"
                  alt="Statement Rings"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-light text-white mb-2">Statement Rings</h3>
                <p className="text-white/80 font-light">Bold statements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <BestSellers />

      {/* New Arrivals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">New Arrivals</h2>
            <p className="text-gray-600 font-light">Discover our latest creations</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recentProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/catalogue" 
              className="inline-flex items-center gap-2 px-8 py-4 border border-black text-black font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300"
            >
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Video Section - Cartier Style */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">Our Story</h2>
            <p className="text-gray-600 font-light">Discover the craftsmanship behind our jewelry</p>
          </div>
          
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=1200"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
                <Play className="w-6 h-6 text-black ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-light mb-6">Begin Your Journey</h2>
          <p className="text-xl text-white/90 mb-8 font-light">
            Discover the perfect piece that speaks to your soul.
          </p>
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
          >
            Explore Our Collection
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;