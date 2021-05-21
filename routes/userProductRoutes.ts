import express from 'express';
import { createProduct, updateProduct, deleteProduct, getAllProductByUser, getFavoriteProductByUser, updateFavoriteProduct } from '../controllers/productController'
import { logout, updateProfile, userProfile } from '../controllers/userController';
import {auth, userAuth} from "../middlewares/auth";
import multer from "../middlewares/multer-config";
const router = express.Router();



router.get('/me', auth, userAuth, userProfile)
router.put('/me', auth, userAuth, multer, updateProfile)
router.post('/me/logout', auth, userAuth, logout)

router.get('/me/product', auth, userAuth, getAllProductByUser)
router.get('/me/product/favorite', auth, userAuth, getFavoriteProductByUser)
router.put('/me/product/favorite/:id', auth, userAuth, updateFavoriteProduct)
router.put('/me/product/:id',auth, userAuth, updateProduct)
router.post('/me/product', auth, userAuth, multer ,createProduct)
router.delete('/me/product/:id',auth, userAuth, multer, deleteProduct)


export default router;
