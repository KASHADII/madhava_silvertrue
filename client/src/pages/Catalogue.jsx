import React, { useEffect } from "react";
import ProductList from "@/components/custom/ProductList";
import FilterMenu from "@/components/custom/FilterMenu";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Filter } from "lucide-react";
import axios from "axios";

const Catalogue = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-products?category=all");
      dispatch(setProducts(res.data.data));
    };
    getProducts();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-2 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8" />
            Jewellery Catalogue
            <Sparkles className="h-8 w-8" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our exclusive collection of fine jewelry. 
            Find the perfect piece for every occasion.
          </p>
        </div>

        {/* Filter Section */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <FilterMenu />
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Our Collection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ProductList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Catalogue; 