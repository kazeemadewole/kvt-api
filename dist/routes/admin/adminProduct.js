"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = require("../../controllers/adminControllers/productController");
var auth_1 = require("../../middlewares/auth");
var router = express_1.default.Router();
router.get('/approved', auth_1.auth, auth_1.adminAuth, productController_1.adminGetAllApprovedProduct);
router.get('/pending', auth_1.auth, auth_1.adminAuth, productController_1.adminGetAllPendingProduct);
router.put('/:id', auth_1.auth, auth_1.adminAuth, productController_1.adminUpdateProduct);
router.delete('/:id', auth_1.auth, auth_1.adminAuth, productController_1.adminDeleteProduct);
exports.default = router;
