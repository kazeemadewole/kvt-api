import {Request, Response, NextFunction} from 'express'
import multer from "multer";

const MIME_TYPES:Record<string, string> = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req:Request, file, callback) => {
    callback(null, "dist/public/images");
  },
  filename: (req:Request, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

export default multer({ storage: storage }).array("productImage", 5);
