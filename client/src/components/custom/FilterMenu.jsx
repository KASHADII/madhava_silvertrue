import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";

const FilterMenu = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(import.meta.env.VITE_API_URL + "/categories/get-categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFilterProducts = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL +
            `/products/get-products?category=${category === "all" ? "" : category}&price=${price}&search=${search}`
        );
        dispatch(setProducts(res.data.data || []));
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setProducts([]));
      }
    };
    getFilterProducts();
  }, [category, price, search, dispatch]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* DROPDOWN FILTERS */}
      <div className="flex sm:w-[30%] w-full gap-3">
        {/* FOR CATEGORY */}
        <Select onValueChange={(value) => setCategory(value)} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent position="popper">
            {loading ? (
              <SelectItem value="loading" disabled>
                Loading categories...
              </SelectItem>
            ) : !categories || categories.length === 0 ? (
              <SelectItem value="none" disabled>
                No categories available
              </SelectItem>
            ) : (
              <>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category.name} className="capitalize">
                    {category.name}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>

        {/* FOR PRICE */}
        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger id="Price">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent position="popper">
            {[1000, 3000, 5000, 8000].map((item) => (
              <SelectItem key={item} value={item} className="capitalize">
                Less than ₹{item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SEARCH INPUT */}
      <div className="sm:w-[60%] w-full">
        <Input
          id="search"
          placeholder="Search Here..."
          onChange={(e) => setSearch(e.target.value)}
          className="border-gray-200 focus:border-black focus:ring-black"
        />
      </div>
    </div>
  );
};

export default FilterMenu;
