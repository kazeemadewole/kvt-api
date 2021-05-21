import {HttpError} from 'http-errors'
import {Request, Response, NextFunction} from 'express'
import AppError from '../utils/appError'

const handleCastErrorDB = (err:HttpError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err:HttpError) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `The value: ${value} already exist!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err:HttpError) => {
  const errors = Object.values(err.errors).map((el:any) => el.message);
  console.log(errors);
  const message = `Invalid Input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err:HttpError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err:HttpError, res:Response) => {
  //Operational trusted error: send to message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or unknown errors: Don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR", err);
    // 2) send message
    res.status(500).json({
      status: "error",
      message: "Something went really wrong!",
    });
  }
};

export default (err:any, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status =  err.status || 'error'

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === "User validation failed")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};