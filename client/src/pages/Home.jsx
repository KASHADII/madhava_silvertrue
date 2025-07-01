import React, { useEffect, useState } from "react";
import HeaderDisplay from "@/components/custom/HeaderDisplay";
import ProductCard from "@/components/custom/ProductCard";
import axios from "axios";

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

const faqs = [
  {
    question: "What materials are your jewellery pieces made from?",
    answer: "Our jewellery is crafted from high-quality gold, silver, and precious stones, ensuring both beauty and durability.",
  },
  {
    question: "How do I care for my jewellery?",
    answer: "We recommend storing your jewellery in a dry place and cleaning it gently with a soft cloth. Avoid contact with chemicals and perfumes.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free shipping on all orders above ₹2,000 across India.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Absolutely! We have a 7-day return and exchange policy. Please refer to our Returns page for more details.",
  },
];

const Home = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/get-products?page=1&limit=4");
      const data = await res.data;
      setRecentProducts(data.data || []);
    };
    fetchRecentProducts();
  }, []);

  return (
    <div className="bg-[#fff] min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 bg-gradient-to-b from-[#fffbe6] to-[#fff]">
        <h1 className="text-5xl font-bold text-[#D4AF37] mb-4 tracking-tight drop-shadow-lg">Discover Timeless Jewellery</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">Luxury crafted for every occasion. Explore our exclusive collection of gold, silver, and diamond jewellery designed to make you shine.</p>
        <a href="/catalogue" className="px-8 py-3 bg-[#D4AF37] text-white rounded-full font-semibold shadow-lg hover:bg-[#bfa133] transition">Shop Now</a>
      </section>
      {/* Banner Carousel */}
      <HeaderDisplay />
      {/* Recently Added Products */}
      <section className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-6">New Arrivals</h2>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center">
          {recentProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
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
      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto my-16 p-6 rounded-2xl bg-white shadow-lg border border-[#f5e7c5]">
        <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </section>
    </div>
  );
};

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f5e7c5] pb-4">
      <button
        className="w-full flex justify-between items-center text-lg font-semibold text-[#D4AF37] focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {question}
        <span className={`ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>
      {open && (
        <div className="mt-2 text-gray-700 bg-[#fffbe6] rounded-lg p-4 transition-all duration-300">
          {answer}
        </div>
      )}
    </div>
  );
}

export default Home;