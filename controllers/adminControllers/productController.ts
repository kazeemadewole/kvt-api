import express, { Request, Response, NextFunction } from "express";
import Product from "../../models/productSchema";
import slug from 'slugify'
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";



export const adminGetAllApprovedProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({ status: "approved" }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});

export const adminGetAllPendingProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({ status: "pending" }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' });
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
})


export const adminUpdateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

export const adminDeleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new AppError("No post found with that Id", 404))
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});


