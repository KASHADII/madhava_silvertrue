import React, { useEffect, useState } from "react";
import ProductCard from "@/components/custom/ProductCard";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBestSellers } from "@/redux/slices/productSlice";

const BestSellers = () => {
  const { bestSellers } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-best-sellers");
        const data = await res.data;
        if (data.success) {
          dispatch(setBestSellers(data.data || []));
        }
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">Best Sellers</h2>
            <p className="text-gray-600 font-light">Our most popular products</p>
          </div>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return null; // Don't show the section if there are no best sellers
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-black mb-4">Best Sellers</h2>
          <p className="text-gray-600 font-light">Our most popular products</p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/catalogue" 
            className="inline-flex items-center gap-2 px-8 py-4 border border-black text-black font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
