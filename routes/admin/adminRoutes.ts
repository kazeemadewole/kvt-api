import express from "express";
import { adminLogout, createAdmin, loginAdmin } from "../../controllers/adminControllers/adminController";
import { adminAuth, auth } from "../../middlewares/auth";
const router = express.Router();


router.post("/login", loginAdmin);

router.post("/signup", createAdmin);

router.post('/logout', auth, adminAuth, adminLogout)



export default router;
