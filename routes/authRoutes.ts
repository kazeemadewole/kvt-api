import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { createUser, login, updateProfile } from '../controllers/userController'
import { auth, userAuth } from "../middlewares/auth";


router.post("/login", login);

router.post("/signup", createUser);



export default router;
