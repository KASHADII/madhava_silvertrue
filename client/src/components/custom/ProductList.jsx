import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Edit, Search, Trash2, Eye, Upload, X, Image as ImageIcon, Star, StarOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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
import { Label } from "../ui/label";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import { useToast } from "@/hooks/use-toast";
import useErrorLogout from "@/hooks/use-error-logout";
import { ToastAction } from "../ui/toast";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { handleErrorLogout } = useErrorLogout();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL +
          `/products/get-products?category=${category}&search=${searchTerm}`,
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
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/categories/get-categories-admin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data.data);
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  const deleteProduct = async () => {
    if (!deletingProduct) return;
    
    try {
      const res = await axios.delete(
        import.meta.env.VITE_API_URL + `/products/delete-product/${deletingProduct._id}`,
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
    setNewImages([]);
    setRemovedImages([]);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId) => {
    setRemovedImages(prev => [...prev, imageId]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    
    // Add new images
    newImages.forEach((image) => {
      formData.append("newImages", image);
    });
    
    // Add removed image IDs as JSON string
    if (removedImages.length > 0) {
      formData.append("removedImages", JSON.stringify(removedImages));
    }

    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/products/update-product/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    setNewImages([]);
    setRemovedImages([]);
  };

  const toggleBestSeller = async (product) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/products/toggle-best-seller/${product._id}`,
        {},
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
      handleErrorLogout(error, "Error occurred while updating best seller status");
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8">Product List</h1>

      <div className="mb-8">
        <form className="flex gap-4 items-end sm:w-[80vw]">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="search"
            >
              Search Products
            </label>
            <div className="relative">
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
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Best Seller</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-mono text-sm">
                    {product._id.slice(-8)}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>₹{product.price?.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.blacklisted ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Blacklisted
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={product.bestSeller ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleBestSeller(product)}
                      className={product.bestSeller ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                    >
                      {product.bestSeller ? (
                        <>
                          <Star className="h-4 w-4 mr-1" />
                          Pinned
                        </>
                      ) : (
                        <>
                          <StarOff className="h-4 w-4 mr-1" />
                          Pin
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Images Section */}
              <div className="grid gap-4 items-center">
                <Label>Current Images</Label>
                <div className="grid grid-cols-3 gap-4">
                  {editingProduct?.images?.map((image, index) => (
                    !removedImages.includes(image.id) && (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(image.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* New Images Upload Section */}
              <div className="grid gap-4 items-center">
                <Label htmlFor="newImages">Add New Images</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="newImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('newImages').click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                
                {/* Preview New Images */}
                {newImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {newImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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

export default ProductList;
