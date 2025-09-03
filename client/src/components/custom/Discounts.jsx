import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "flat",
    value: "",
    minOrderValue: "",
    maxDiscountCap: "",
    startDate: "",
    endDate: "",
    status: "active",
    usageLimit: "",
    usagePerUser: "",
    applicableProducts: [],
    applicableCategories: [],
    eligibleUsers: [],
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDiscounts();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/discounts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDiscounts(res.data.data);
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to fetch discounts", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/products/get-products?category=all");
      setProducts(res.data.data || []);
    } catch (error) {}
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/categories/get-categories");
      setCategories(res.data.data || []);
    } catch (error) {}
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Multi-select for products/categories
  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingDiscount) {
        await axios.patch(
          import.meta.env.VITE_API_URL + `/discounts/${editingDiscount._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Success", description: "Discount updated" });
      } else {
        await axios.post(
          import.meta.env.VITE_API_URL + "/discounts",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Success", description: "Discount created" });
      }
      setIsDialogOpen(false);
      setEditingDiscount(null);
      setFormData({ code: "", type: "flat", value: "", minOrderValue: "", maxDiscountCap: "", startDate: "", endDate: "", status: "active", usageLimit: "", usagePerUser: "", applicableProducts: [], applicableCategories: [], eligibleUsers: [], });
      fetchDiscounts();
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to save discount", variant: "destructive" });
    }
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      ...discount,
      startDate: discount.startDate ? discount.startDate.slice(0, 10) : "",
      endDate: discount.endDate ? discount.endDate.slice(0, 10) : "",
      value: discount.value ?? "",
      minOrderValue: discount.minOrderValue ?? "",
      maxDiscountCap: discount.maxDiscountCap ?? "",
      usageLimit: discount.usageLimit ?? "",
      usagePerUser: discount.usagePerUser ?? "",
      applicableProducts: discount.applicableProducts || [],
      applicableCategories: discount.applicableCategories || [],
      eligibleUsers: discount.eligibleUsers || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (discountId) => {
    if (!window.confirm("Delete this discount?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        import.meta.env.VITE_API_URL + `/discounts/${discountId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: "Success", description: "Discount deleted" });
      fetchDiscounts();
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to delete discount", variant: "destructive" });
    }
  };

  const handleStatusToggle = async (discount) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        import.meta.env.VITE_API_URL + `/discounts/${discount._id}`,
        { status: discount.status === "active" ? "inactive" : "active" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDiscounts();
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to update status", variant: "destructive" });
    }
  };

  // --- Apply Discount Simulation Section ---
  const [applyInput, setApplyInput] = useState({
    code: "",
    userId: "",
    cartValue: "",
    cartItems: [],
    mockMode: true, // Enable mock mode by default
  });
  const [applyResult, setApplyResult] = useState(null);

  // Helper for cart items multi-select rendering
  const renderCartItemsMultiSelect = (items, onChange) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Cart Items (Product IDs, comma separated)</label>
      <Input value={items.map(i => i.productId).join(",")} onChange={e => onChange(e.target.value.split(",").map(v => v.trim()).filter(Boolean).map(pid => ({ productId: pid })))} />
    </div>
  );

  // Helper for multi-select rendering
  const renderMultiSelect = (options, selected, onChange, labelKey = "name", valueKey = "_id") => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Button
          key={opt[valueKey] || opt}
          type="button"
          variant={selected.includes(opt[valueKey] || opt) ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(opt[valueKey] || opt)}
        >
          {opt[labelKey] || opt}
        </Button>
      ))}
    </div>
  );

  const handleApplyDiscount = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/discounts/apply",
        {
          ...applyInput,
          cartValue: Number(applyInput.cartValue),
          cartItems: applyInput.cartItems,
        }
      );
      setApplyResult(res.data);
    } catch (error) {
      setApplyResult({ success: false, message: error.response?.data?.message || "Failed to apply discount" });
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Discount Codes</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingDiscount(null); setFormData({ code: "", type: "flat", value: "", minOrderValue: "", maxDiscountCap: "", startDate: "", endDate: "", status: "active", usageLimit: "", usagePerUser: "", applicableProducts: [], applicableCategories: [], eligibleUsers: [], }); }}>Add Discount</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingDiscount ? "Edit Discount" : "Add Discount"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label>Discount Code *</label>
                      <Input name="code" value={formData.code} onChange={handleFormChange} required disabled={!!editingDiscount} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label>Type *</label>
                      <Select name="type" value={formData.type} onValueChange={val => setFormData(f => ({ ...f, type: val }))}>
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Flat</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="free_shipping">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(formData.type === "flat" || formData.type === "percentage") && (
                    <div className="space-y-2">
                      <label>Discount Value *</label>
                      <Input name="value" type="number" value={formData.value} onChange={handleFormChange} required />
                    </div>
                  )}
                  {formData.type === "percentage" && (
                    <div className="space-y-2">
                      <label>Max Discount Cap</label>
                      <Input name="maxDiscountCap" type="number" value={formData.maxDiscountCap} onChange={handleFormChange} />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label>Minimum Order Value</label>
                    <Input name="minOrderValue" type="number" value={formData.minOrderValue} onChange={handleFormChange} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label>Start Date *</label>
                      <Input name="startDate" type="date" value={formData.startDate} onChange={handleFormChange} required />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label>End Date *</label>
                      <Input name="endDate" type="date" value={formData.endDate} onChange={handleFormChange} required />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label>Status</label>
                      <Select name="status" value={formData.status} onValueChange={val => setFormData(f => ({ ...f, status: val }))}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <label>Usage Limit</label>
                      <Input name="usageLimit" type="number" value={formData.usageLimit} onChange={handleFormChange} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label>Usage Per User</label>
                      <Input name="usagePerUser" type="number" value={formData.usagePerUser} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Applicable Products</label>
                    {renderMultiSelect(products, formData.applicableProducts, val => handleMultiSelect("applicableProducts", val), "name", "_id")}
                  </div>
                  <div className="space-y-2">
                    <label>Applicable Categories</label>
                    {renderMultiSelect(categories, formData.applicableCategories, val => handleMultiSelect("applicableCategories", val), "name", "name")}
                  </div>
                  <div className="space-y-2">
                    <label>Eligible Users (comma separated emails or user IDs)</label>
                    <Input name="eligibleUsers" value={formData.eligibleUsers.join(",")} onChange={e => setFormData(f => ({ ...f, eligibleUsers: e.target.value.split(",").map(v => v.trim()).filter(Boolean) }))} />
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingDiscount ? "Update" : "Create"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Discount Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow>
              ) : discounts.length === 0 ? (
                <TableRow><TableCell colSpan={7}>No discounts found.</TableCell></TableRow>
              ) : (
                discounts.map((discount) => (
                  <TableRow key={discount._id}>
                    <TableCell>{discount.code}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>{discount.type === "flat" ? `₹${discount.value}` : discount.type === "percentage" ? `${discount.value}%` : "-"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant={discount.status === "active" ? "default" : "outline"} onClick={() => handleStatusToggle(discount)}>
                        {discount.status === "active" ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                    <TableCell>{discount.startDate ? new Date(discount.startDate).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>{discount.endDate ? new Date(discount.endDate).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(discount)}>Edit</Button>{" "}
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(discount._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Apply Discount Simulation Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Apply Discount (Simulation)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); handleApplyDiscount(); }} className="space-y-4">
            <div className="flex gap-4">
              <Input placeholder="Discount Code" value={applyInput.code} onChange={e => setApplyInput(i => ({ ...i, code: e.target.value }))} required />
              <Input placeholder="User ID" value={applyInput.userId} onChange={e => setApplyInput(i => ({ ...i, userId: e.target.value }))} required />
              <Input placeholder="Cart Value" type="number" value={applyInput.cartValue} onChange={e => setApplyInput(i => ({ ...i, cartValue: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <label>Cart Items (Product IDs, comma separated)</label>
              <Input value={applyInput.cartItems.map(i => i.productId).join(",")} onChange={e => setApplyInput(i => ({ ...i, cartItems: e.target.value.split(",").map(v => v.trim()).filter(Boolean).map(pid => ({ productId: pid })) }))} />
            </div>
            <Button type="submit">Apply Discount</Button>
          </form>
          {applyResult && (
            <div className="mt-4">
              {applyResult.success ? (
                <div className="text-green-600 font-semibold">Discount Applied: ₹{applyResult.discountAmount} ({applyResult.type})</div>
              ) : (
                <div className="text-red-600 font-semibold">{applyResult.message}</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Discounts; 