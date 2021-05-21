import express, { Request, Response, NextFunction } from "express";
import slug from 'slugify'
import Category from "../../models/categorySchema";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";



export const getCategory = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  const category = await Category.find()
  res.status(200).json({
    status: "success",
    data: category
  })
})

export const createCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    await Category.create({
        ...req.body,
        slug: slug(req.body.category)
    })
    res.status(201).json({
        status: "success"
    })
})

export const updateCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
    res.status(201).json({
        status: "success"
    })
})

export const deleteCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const deletedProduct = await Category.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new AppError("No post found with that Id", 404))
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
})