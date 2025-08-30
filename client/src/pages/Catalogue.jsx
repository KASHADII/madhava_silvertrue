import React, { useEffect, useState } from "react";
import ProductCard from "@/components/custom/ProductCard";
import FilterMenu from "@/components/custom/FilterMenu";
import ErrorBoundary from "@/components/custom/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Filter } from "lucide-react";
import axios from "axios";

const Catalogue = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-products?category=all");
        dispatch(setProducts(res.data.data || []));
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setProducts([]));
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-black" />
              <h1 className="text-4xl font-light text-black">Jewellery Catalogue</h1>
              <Sparkles className="h-8 w-8 text-black" />
            </div>
            <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Browse our exclusive collection of fine jewelry. 
              Find the perfect piece for every occasion.
            </p>
          </div>

          {/* Filter Section */}
          <Card className="shadow-lg border border-gray-200 bg-white mb-8">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-black font-light">
                <Filter className="h-5 w-5 text-black" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <FilterMenu />
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-black font-light">
                <Sparkles className="h-5 w-5 text-black" />
                Our Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      {...product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Catalogue; 