import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Discounts = () => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDiscounts();
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


  const handleAddDiscount = () => {
    navigate("/admin/dashboard/discounts/create");
  };


  const handleEditWithProductSelection = (discount) => {
    navigate("/admin/dashboard/discounts/edit", {
      state: {
        discountData: {
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
        },
        isEditing: true,
        editingDiscountId: discount._id
      }
    });
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
            <Button onClick={handleAddDiscount}>
              Add Discount
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Discount Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
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
                <TableRow><TableCell colSpan={8}>Loading...</TableCell></TableRow>
              ) : discounts.length === 0 ? (
                <TableRow><TableCell colSpan={8}>No discounts found.</TableCell></TableRow>
              ) : (
                discounts.map((discount) => (
                  <TableRow key={discount._id}>
                    <TableCell className="font-medium">{discount.code}</TableCell>
                    <TableCell className="max-w-xs truncate" title={discount.description}>
                      {discount.description || "-"}
                    </TableCell>
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
                      <Button size="sm" variant="outline" onClick={() => handleEditWithProductSelection(discount)}>Edit</Button>{" "}
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