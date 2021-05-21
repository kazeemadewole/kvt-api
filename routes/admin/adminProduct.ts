import express from 'express'
import { adminDeleteProduct, adminGetAllPendingProduct, adminGetAllApprovedProduct, adminUpdateProduct } from '../../controllers/adminControllers/productController'
import { adminAuth, auth } from '../../middlewares/auth'
const router = express.Router()


router.get('/approved', auth, adminAuth, adminGetAllApprovedProduct)
router.get('/pending', auth, adminAuth, adminGetAllPendingProduct)
router.put('/:id', auth, adminAuth, adminUpdateProduct)
router.delete('/:id', auth, adminAuth, adminDeleteProduct)



export default router