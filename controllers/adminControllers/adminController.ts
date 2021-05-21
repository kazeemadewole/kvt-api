import express, { Request, Response, NextFunction } from "express";
import User from "../../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import { CallbackError } from "mongoose";



export const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create({ ...req.body });
  res.status(201).json({ status: "User created!", data: newUser });
});

const maxAge = 24 * 60 * 60;

export const loginAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((error: CallbackError, user: any) => {
    if (user) {
      bcrypt.compare(password, user.password).then((result) => {
        if(result) {
        const token: any = jwt.sign({ _id: user._id.toString(), role: user.role }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
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


export const getAllUsers = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const users = await User.find({role: "user"}).select('-password -tokens')
    res.status(200).json({
      status: "success",
      data: users
    })
})

export const deleteUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status: "success",
    data: null
  })
})

export const adminLogout = catchAsync(async (req:Request | any, res:Response, next:NextFunction) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(200).json({
    status: 'Logged out!'
  })
})