import React, { useEffect } from "react";
import ProductList from "@/components/custom/ProductList";
import FilterMenu from "@/components/custom/FilterMenu";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import axios from "axios";

const Catalogue = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/get-products?category=all");
      const data = await res.data;
      dispatch(setProducts(data.data));
    };
    fetchAllProducts();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-[#D4AF37] mb-4">Jewellery Catalogue</h1>
        <p className="text-center text-gray-700 mb-8">Browse our exclusive collection of rings, necklaces, earrings, and more. Find the perfect piece for every occasion.</p>
        <FilterMenu />
        <ProductList />
      </div>
    </div>
  );
};

export default Catalogue; 