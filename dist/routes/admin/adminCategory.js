"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categoryController_1 = require("../../controllers/adminControllers/categoryController");
var auth_1 = require("../../middlewares/auth");
var router = express_1.default.Router();
router.get('/category', auth_1.auth, auth_1.adminAuth, categoryController_1.getCategory);
router.post('/category', auth_1.auth, auth_1.adminAuth, categoryController_1.createCategory);
router.put('/category/:id', auth_1.auth, auth_1.adminAuth, categoryController_1.updateCategory);
router.delete('/category/:id', auth_1.auth, auth_1.adminAuth, categoryController_1.deleteCategory);
exports.default = router;
