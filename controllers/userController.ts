import express, { Request, Response, NextFunction } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { UserInterface } from "../models/schemaInterface";


export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create({ ...req.body });
  res.status(201).json({ status: "User created!", data: newUser });
});


const maxAge = 24 * 60 * 60;

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((error, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((result) => {   
        if (result) {
        const token: any = jwt.sign({ _id: user._id.toString(), role: user.role }, "RANDOM_TOKEN_SECRET", {
          expiresIn: maxAge,
        });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        return res.status(200).json({
          data: user,
          token: token,
        });
      } else {
        throw error
      }
      }).catch((err) => next(new AppError("Unable to login!", 401)))
    } else {
      return next(new AppError("Please Register with us!!", 401))
    }
  });
})


export const userProfile = catchAsync(async(req:Request | any, res:Response, next:NextFunction) => {
  return res.status(200).json({
    data: req.user,
  });
})
  
export const updateProfile = catchAsync(async (req:Request | any, res:Response, next:NextFunction) => {
  let { image } = req.files
  const url = req.protocol + "://" + req.get("host")
  image = `${url}/${req.files[0].path}`
  const user = await User.findByIdAndUpdate(req.user._id, {...req.body, ...image}, {
    new: true,
    runValidators: true,
  }).select('-password -tokens')
  req.user = user
  res.status(200).json({
    status: "success",
    data: user
  });
})

export const logout = catchAsync(async (req:Request | any, res:Response, next:NextFunction) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(200).json({
    status: 'Logged out!'
  })
})