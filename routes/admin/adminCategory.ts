import express from 'express'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../controllers/adminControllers/categoryController'
import { adminAuth, auth } from '../../middlewares/auth'
const router = express.Router()

router.get('/category', auth, adminAuth, getCategory)
router.post('/category', auth, adminAuth, createCategory)
router.put('/category/:id', auth, adminAuth, updateCategory)
router.delete('/category/:id', auth, adminAuth, deleteCategory)

export default router


