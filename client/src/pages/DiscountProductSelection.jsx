import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ArrowLeft, Save } from "lucide-react";

const DiscountProductSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Get discount data from navigation state
  const discountData = location.state?.discountData || {};
  const isEditing = location.state?.isEditing || false;
  const editingDiscountId = location.state?.editingDiscountId || null;

  useEffect(() => {
    fetchProducts();
    // If editing, load existing selected products
    if (isEditing && discountData.applicableProducts) {
      setSelectedProducts(discountData.applicableProducts);
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-products?category=all");
      setProducts(res.data.data || []);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to fetch products", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products.map(product => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const isAllSelected = products.length > 0 && selectedProducts.length === products.length;
  const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < products.length;

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const updatedDiscountData = {
        ...discountData,
        applicableProducts: selectedProducts,
        // Ensure eligibleUsers is properly formatted
        eligibleUsers: discountData.eligibleUsers || "",
        // Ensure other array fields are properly formatted
        applicableCategories: discountData.applicableCategories || [],
        // Ensure description is included
        description: discountData.description || ""
      };

      if (isEditing && editingDiscountId) {
        // Update existing discount
        await axios.patch(
          import.meta.env.VITE_API_URL + `/discounts/${editingDiscountId}`,
          updatedDiscountData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Success", description: "Discount updated successfully" });
      } else {
        // Create new discount
        await axios.post(
          import.meta.env.VITE_API_URL + "/discounts",
          updatedDiscountData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Success", description: "Discount created successfully" });
      }
      
      navigate("/admin/dashboard/discounts");
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to save discount", 
        variant: "destructive" 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard/discounts");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discounts
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Discount" : "Create Discount"} - Product Selection
            </h1>
            <p className="text-gray-600 mt-2">
              Select products for discount: <strong>{discountData.code || "New Discount"}</strong>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {selectedProducts.length} of {products.length} products selected
            </div>
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Discount"}
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Products for Discount</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading products...</div>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        ref={(el) => {
                          if (el) el.indeterminate = isIndeterminate;
                        }}
                      />
                    </TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product._id)}
                            onCheckedChange={(checked) => 
                              handleProductSelect(product._id, checked)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.description && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{product.price}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            product.stock > 10 
                              ? "bg-green-100 text-green-800" 
                              : product.stock > 0 
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            product.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      {selectedProducts.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Products Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedProducts.length}
                </div>
                <div className="text-sm text-blue-800">Products Selected</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{products
                    .filter(p => selectedProducts.includes(p._id))
                    .reduce((sum, p) => sum + p.price, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-green-800">Total Value</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((selectedProducts.length / products.length) * 100)}%
                </div>
                <div className="text-sm text-purple-800">Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscountProductSelection;
