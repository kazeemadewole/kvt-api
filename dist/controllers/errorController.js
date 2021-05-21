"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appError_1 = __importDefault(require("../utils/appError"));
var handleCastErrorDB = function (err) {
    var message = "Invalid " + err.path + ": " + err.value + ".";
    return new appError_1.default(message, 400);
};
var handleDuplicateFieldsDB = function (err) {
    var value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    var message = "The value: " + value + " already exist!";
    return new appError_1.default(message, 400);
};
var handleValidationErrorDB = function (err) {
    var errors = Object.values(err.errors).map(function (el) { return el.message; });
    console.log(errors);
    var message = "Invalid Input data. " + errors.join(". ");
    return new appError_1.default(message, 400);
};
var sendErrorDev = function (err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
var sendErrorProd = function (err, res) {
    //Operational trusted error: send to message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // Programming or unknown errors: Don't leak error details
    }
    else {
        // 1) Log error
        console.error("ERROR", err);
        // 2) send message
        res.status(500).json({
            status: "error",
            message: "Something went really wrong!",
        });
    }
};
exports.default = (function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        var error = __assign({}, err);
        if (error.name === "CastError")
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error._message === "User validation failed")
            error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }
});
