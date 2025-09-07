import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

const DiscountForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get existing data if editing
  const existingData = location.state?.discountData || {};
  const isEditing = location.state?.isEditing || false;
  
  const [formData, setFormData] = useState({
    code: existingData.code || "",
    type: existingData.type || "flat",
    value: existingData.value || "",
    description: existingData.description || "",
    minOrderValue: existingData.minOrderValue || "",
    maxDiscountCap: existingData.maxDiscountCap || "",
    startDate: existingData.startDate || "",
    endDate: existingData.endDate || "",
    status: existingData.status || "active",
    usageLimit: existingData.usageLimit || "",
    usagePerUser: existingData.usagePerUser || "",
    applicableCategories: existingData.applicableCategories || [],
    eligibleUsers: existingData.eligibleUsers || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.code.trim()) errors.push("Discount code is required");
    if (!formData.description.trim()) errors.push("Discount description is required");
    if (!formData.startDate) errors.push("Start date is required");
    if (!formData.endDate) errors.push("End date is required");
    if ((formData.type === "flat" || formData.type === "percentage") && !formData.value) {
      errors.push("Discount value is required");
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.push("End date must be after start date");
    }
    
    return errors;
  };

  const handleNext = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive"
      });
      return;
    }

    // Navigate to product selection with form data
    const nextRoute = isEditing ? "/admin/dashboard/discounts/edit/products" : "/admin/dashboard/discounts/create/products";
    navigate(nextRoute, {
      state: {
        discountData: formData,
        isEditing,
        editingDiscountId: location.state?.editingDiscountId
      }
    });
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
        
        <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Discount" : "Create Discount"} - Basic Information
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the basic discount information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discount Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Code *</label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g., SAVE20"
                disabled={isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., Get 20% off on all electronics"
              />
              <p className="text-xs text-gray-500">
                This description will be shown to customers to help them understand the discount
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type *</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(formData.type === "flat" || formData.type === "percentage") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Value *</label>
                  <Input
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder={formData.type === "flat" ? "e.g., 100" : "e.g., 20"}
                  />
                  <p className="text-xs text-gray-500">
                    {formData.type === "flat" ? "Amount in ₹" : "Percentage (1-100)"}
                  </p>
                </div>
                
                {formData.type === "percentage" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Discount Cap</label>
                    <Input
                      name="maxDiscountCap"
                      type="number"
                      value={formData.maxDiscountCap}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                    />
                    <p className="text-xs text-gray-500">Maximum discount amount in ₹</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Order Value</label>
                <Input
                  name="minOrderValue"
                  type="number"
                  value={formData.minOrderValue}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                />
                <p className="text-xs text-gray-500">Minimum cart value to apply discount</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Limit</label>
                <Input
                  name="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                />
                <p className="text-xs text-gray-500">Total usage limit (optional)</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Per User</label>
                <Input
                  name="usagePerUser"
                  type="number"
                  value={formData.usagePerUser}
                  onChange={handleInputChange}
                  placeholder="e.g., 1"
                />
                <p className="text-xs text-gray-500">Usage limit per user (optional)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date *</label>
                <Input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date *</label>
                <Input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Eligible Users</label>
                <Input
                  name="eligibleUsers"
                  value={formData.eligibleUsers}
                  onChange={handleInputChange}
                  placeholder="emails or user IDs (comma separated)"
                />
                <p className="text-xs text-gray-500">Leave empty for all users</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              Next: Select Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountForm;
