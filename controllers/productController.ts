import express, { Request, Response, NextFunction } from "express";
import Product from "../models/productSchema";
import slug from 'slugify'
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";



export const getAllApprovedProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const products = await Product.find({ status: "approved" }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});

export const getAllProductByUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const products = await Product.find({ createdBy: req.user._id }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
    Pending: products.filter(product => product.status === 'pending'),
    Approved: products.filter(product => product.status === 'approved')
  });
})

export const getFavoriteProductByUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const products = await Product.find({ favorite: { $in: [req.user._id] }}).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
})

export const updateFavoriteProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const id = req.params.id
  const product = await Product.findByIdAndUpdate(id, {$push: {favorite: req.user._id}}, {
    new: true
  })
  res.status(200).json({
    status: "success",
    data: product
  })
})


export const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const singlePost = await Product.findById(req.params.id).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  if (!singlePost) {
    return next(new AppError("No post found with that Id", 404))
  }
  res.status(200).json({
    status: "success",
    data: singlePost
  })
});

export const createProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const url = req.protocol + "://" + req.get("host");
  let productImages = []
  if (req.files.length > 0) {
    productImages = req.files.map((file: any) => { return `${url}/${file.path}` })
  }
  const newPost = await Product.create({
    title: req.body.title,
    description: req.body.description,
    productImage: productImages,
    contact: req.body.contact,
    location: req.body.location,
    createdBy: req.user._id,
    category: req.body.category,
    slug: slug(req.body.title),
    price: req.body.price
  });
  res.status(200).json({
    status: "success",
    data: newPost,
  });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    return next(new AppError("No post found with that Id", 404))
  }
  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new AppError("No post found with that Id", 404))
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});


