import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import User from '../models/userSchema'
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync'

export const auth = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    // console.log(req.cookies)
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken:any = jwt.verify(token, "RANDOM_TOKEN_SECRET");
            const user = await User.findOne({_id: decodedToken._id})
            if (!user) {
                return next(new AppError(` You are not logged in!!!`, 401));
            } else {
                req.user = user
                req.token = token
            }
        } else {
            return next(new AppError(` You are not logged in!!!`, 401));
    } 
    next()
});

export const adminAuth = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    if (req.user.role === 'admin'){
        next()
    } else {
        return next(new AppError(` Access Denied!!!`, 401));
    }
});

export const userAuth = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    if (req.user.role === 'user'){
        next()
    }else {
        return next(new AppError(` Access Denied!!!`, 401));
    }
});