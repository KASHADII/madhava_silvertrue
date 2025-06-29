import FilterMenu from "@/components/custom/FilterMenu";
import HeaderDisplay from "@/components/custom/HeaderDisplay";
import ProductList from "@/components/custom/ProductList";
import React from "react";

const testimonials = [
  {
    name: "Aarushi S.",
    text: "Absolutely stunning jewellery! The quality and design are unmatched. I feel so elegant wearing these pieces.",
  },
  {
    name: "Priya K.",
    text: "Fast delivery and beautiful packaging. My go-to store for gifts!",
  },
  {
    name: "Meera D.",
    text: "The gold finish is so premium. I get compliments every time I wear my necklace!",
  },
];

const featuredCollections = [
  {
    title: "Elegant Necklaces",
    image: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=600",
  },
  {
    title: "Classic Earrings",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=600",
  },
  {
    title: "Statement Rings",
    image: "https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&w=600",
  },
];

const Home = () => {
  return (
    <div className="bg-[#fff] min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 bg-gradient-to-b from-[#fffbe6] to-[#fff]">
        <h1 className="text-5xl font-bold text-[#D4AF37] mb-4 tracking-tight drop-shadow-lg">Discover Timeless Jewellery</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">Luxury crafted for every occasion. Explore our exclusive collection of gold, silver, and diamond jewellery designed to make you shine.</p>
        <a href="#collections" className="px-8 py-3 bg-[#D4AF37] text-white rounded-full font-semibold shadow-lg hover:bg-[#bfa133] transition">Shop Now</a>
      </section>
      {/* Banner Carousel */}
      <HeaderDisplay />
      {/* Featured Collections */}
      <section id="collections" className="py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#D4AF37] mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {featuredCollections.map((col) => (
            <div key={col.title} className="rounded-2xl overflow-hidden shadow-lg border border-[#f5e7c5] bg-white hover:scale-105 transition">
              <img src={col.image} alt={col.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#D4AF37]">{col.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Filter and Product List */}
      <div className="max-w-7xl mx-auto">
        <FilterMenu />
        <ProductList />
      </div>
      {/* Testimonials */}
      <section className="py-16 bg-[#fffbe6] mt-12">
        <h2 className="text-3xl font-semibold text-center text-[#D4AF37] mb-8">What Our Customers Say</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#f5e7c5] rounded-2xl shadow-md p-6 max-w-xs">
              <p className="text-gray-700 italic mb-4">“{t.text}”</p>
              <div className="text-[#D4AF37] font-bold">{t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;