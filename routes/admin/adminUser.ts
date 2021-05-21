import express from "express";
import { deleteUser, getAllUsers } from "../../controllers/adminControllers/adminController";
const router = express.Router();


router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);



export default router;
