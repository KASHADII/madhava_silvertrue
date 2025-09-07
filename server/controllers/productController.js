const { ROLES } = require("../utils/constants");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Order = require("../models/Order");
const Category = require("../models/Category");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { name, price, description, stock, colors, category } = req.body;

    const uploadedImages = [];

    for (const file in req.files) {
      const result = await cloudinary.uploader.upload(req.files[file].path, {
        folder: "products",
      });

      uploadedImages.push({
        url: result.secure_url,
        id: result.public_id,
      });
    }

    const product = new Product({
      name,
      price,
      description,
      stock,
      colors,
      category,
      images: uploadedImages,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const newImages = req.files || [];
    const removedImages = req.body.removedImages ? JSON.parse(req.body.removedImages) : [];

    // Find the existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Handle new image uploads
    const uploadedImages = [];
    if (newImages.length > 0) {
      for (const file of newImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        uploadedImages.push({
          url: result.secure_url,
          id: result.public_id,
        });
      }
    }

    // Handle image removal from Cloudinary
    if (removedImages.length > 0) {
      for (const imageId of removedImages) {
        try {
          await cloudinary.uploader.destroy(imageId);
        } catch (cloudinaryError) {
          console.error("Error deleting image from Cloudinary:", cloudinaryError);
        }
      }
    }

    // Filter out removed images from existing images
    const filteredExistingImages = existingProduct.images.filter(
      (image) => !removedImages.includes(image.id)
    );

    // Combine filtered existing images with new uploaded images
    const updatedImages = [...filteredExistingImages, ...uploadedImages];

    // Update product data
    const updateData = {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price ? parseFloat(price) : existingProduct.price,
      category: category || existingProduct.category,
      images: updatedImages,
    };

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { id } = req.params;

    // Find the product first to get image information
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Delete images from Cloudinary if they exist
    if (product.images && product.images.length > 0) {
      try {
        for (const image of product.images) {
          if (image.id) {
            await cloudinary.uploader.destroy(image.id);
          }
        }
      } catch (cloudinaryError) {
        console.error("Error deleting images from Cloudinary:", cloudinaryError);
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete associated reviews
    try {
      await Review.deleteMany({ productId: id });
    } catch (reviewError) {
      console.error("Error deleting reviews:", reviewError);
      // Continue with product deletion even if review deletion fails
    }

    // Remove product from orders (set to null or remove from array)
    try {
      await Order.updateMany(
        { "products.id": id },
        { $pull: { products: { id: id } } }
      );
    } catch (orderError) {
      console.error("Error updating orders:", orderError);
      // Continue with product deletion even if order update fails
    }

    // Delete the product from database
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Product "${product.name}" deleted successfully`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let { page, limit, category, price, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;

    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) query.name = { $regex: search, $options: "i" };

    if (price > 0) query.price = { $lte: price };

    if (category === "all") delete query.category;

    console.log(query);

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .select("name price images rating description blacklisted")
      .skip((page - 1) * limit)
      .limit(limit);

    let newProductsArray = [];

    products.forEach((product) => {
      const productObj = product.toObject();
      newProductsArray.push(productObj);
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched",
      data: newProductsArray,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    // First try exact match
    let product = await Product.findOne({ name: name });

    // If no exact match, try case-insensitive exact match
    if (!product) {
      product = await Product.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") }
      });
    }

    // If still no match, try partial match as fallback
    if (!product) {
      product = await Product.findOne({
        name: { $regex: new RegExp(name, "i") }
      });
    }

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res
      .status(200)
      .json({ success: true, message: "Product found", data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const blacklistProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: true },
      { new: true }
    );

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({
      success: true,
      message: `The product ${product.name} has been blacklisted`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromBlacklist = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: false },
      { new: true }
    );

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({
      success: true,
      message: `The product ${product.name} has been removed from blacklisted`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const toggleBestSeller = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if we're trying to set as best seller
    const newBestSellerStatus = !product.bestSeller;
    
    // If setting as best seller, check if we already have 4 best sellers
    if (newBestSellerStatus) {
      const currentBestSellersCount = await Product.countDocuments({ bestSeller: true });
      if (currentBestSellersCount >= 4) {
        return res.status(400).json({ 
          success: false, 
          message: "Cannot set more than 4 products as best sellers" 
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { bestSeller: newBestSellerStatus },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Product ${updatedProduct.name} has been ${newBestSellerStatus ? 'set as' : 'removed from'} best seller`,
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ bestSeller: true })
      .select("name price images rating description")
      .limit(4);

    return res.status(200).json({
      success: true,
      message: "Best sellers fetched successfully",
      data: bestSellers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
  toggleBestSeller,
  getBestSellers,
};
