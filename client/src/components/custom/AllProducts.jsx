import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import { useToast } from "@/hooks/use-toast";
import useErrorLogout from "@/hooks/use-error-logout";
import { ToastAction } from "../ui/toast";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { handleErrorLogout } = useErrorLogout();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL +
          `/get-products?category=${category}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;
      if (data.success) {
        dispatch(setProducts(data.data));
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch products",
          variant: "destructive",
        });
      }
    } catch (error) {
      handleErrorLogout(error, "Error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  const removeFromBlacklist = async (id) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/remove-from-blacklist/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { message } = res.data;

      toast({
        title: "Success",
        description: message,
      });
      
      // Refresh the products list
      fetchProducts();
    } catch (error) {
      handleErrorLogout(error, "Error occurred while reverting changes");
    }
  };

  const blacklistProduct = async (id) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/blacklist-product/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { message, data } = res.data;

      toast({
        title: "Success",
        description: message,
        action: (
          <ToastAction
            altText="undo changes"
            onClick={() => {
              removeFromBlacklist(data._id);
            }}
          >
            Undo Changes
          </ToastAction>
        ),
      });
      
      // Refresh the products list
      fetchProducts();
    } catch (error) {
      handleErrorLogout(error, "Error occurred while blacklisting product");
    }
  };

  const deleteProduct = async () => {
    if (!deletingProduct) return;
    
    try {
      const res = await axios.delete(
        import.meta.env.VITE_API_URL + `/delete-product/${deletingProduct._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { message } = res.data;

      toast({
        title: "Success",
        description: message,
      });
      
      // Refresh the products list
      fetchProducts();
      
      // Close the delete modal
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
    } catch (error) {
      handleErrorLogout(error, "Error occurred while deleting product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      ...editingProduct,
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      category: formData.get("category"),
    };

    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/update-product/${editingProduct._id}`,
        {
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          category: updatedProduct.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { message } = res.data;

      toast({
        title: "Success",
        description: message,
      });
      
      // Refresh the products list
      fetchProducts();
    } catch (error) {
      return handleErrorLogout(error, "Error occurred while updating product");
    }

    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="mb-8">
        <form className="flex gap-4 items-end sm:w-[80vw]">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="search"
            >
              Search Products
            </label>
            <div className="relative ">
              <Input
                type="text"
                id="search"
                placeholder="Search by name or description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-48">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Ring">Ring</SelectItem>
                <SelectItem value="Necklace">Necklace</SelectItem>
                <SelectItem value="Earrings">Earrings</SelectItem>
                <SelectItem value="Bracelet">Bracelet</SelectItem>
                <SelectItem value="Pendant">Pendant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : products?.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No products found, Try adjusting your search or category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 sm:mx-0">
          {products?.map((product) => (
            <Card key={product._id} className="flex flex-col">
              <div className="aspect-square relative">
                <img
                  src={product.image?.url || product.images?.[0]?.url}
                  alt={product.name}
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>

              <CardContent className="flex-grow p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-bold">₹{product.price?.toFixed(2)}</p>
                {product.blacklisted && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Blacklisted
                    </span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    !product.blacklisted
                      ? blacklistProduct(product._id)
                      : removeFromBlacklist(product._id);
                  }}
                  variant={product.blacklisted ? "outline" : "default"}
                  className="w-full"
                >
                  {!product.blacklisted
                    ? "Blacklist Product"
                    : "Remove from Blacklist"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingProduct?.description}
                  required
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={editingProduct?.price}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingProduct?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ring">Ring</SelectItem>
                    <SelectItem value="Necklace">Necklace</SelectItem>
                    <SelectItem value="Earrings">Earrings</SelectItem>
                    <SelectItem value="Bracelet">Bracelet</SelectItem>
                    <SelectItem value="Pendant">Pendant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteProduct}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
