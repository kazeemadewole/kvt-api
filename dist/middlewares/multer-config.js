"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "dist/public/images");
    },
    filename: function (req, file, callback) {
        var name = file.originalname.split(" ").join("_");
        var extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});
exports.default = multer_1.default({ storage: storage }).array("productImage", 5);
