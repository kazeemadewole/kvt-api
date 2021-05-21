import express from 'express';
import {getAllApprovedProduct, getProductById } from '../controllers/productController'
const router = express.Router();

/* GET home page. */
router.get('/', getAllApprovedProduct)
router.get('/:id', getProductById)




export default router;
