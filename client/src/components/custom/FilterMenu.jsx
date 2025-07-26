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

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/categories/get-categories");
      setCategories(res.data.data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFilterProducts = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL +
          `/products/get-products?category=${category === "all" ? "" : category}&price=${price}&search=${search}`
      );
      setProducts(res.data.data);
    };
    getFilterProducts();
  }, [category, price, search]);

  return (
    <div className="w-[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
      {/* DROPDOWN FILTERS */}
      <div className="flex sm:w-[30%] w-full gap-3">
        {/* FOR CATEGORY */}
        <Select onValueChange={(value) => setCategory(value)} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent position="popper">
            {categories.length === 0 ? (
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
                Less than {item}
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
        />
      </div>
    </div>
  );
};

export default FilterMenu;
