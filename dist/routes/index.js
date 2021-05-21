"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = require("../controllers/productController");
var router = express_1.default.Router();
/* GET home page. */
router.get('/', productController_1.getAllApprovedProduct);
router.get('/:id', productController_1.getProductById);
exports.default = router;
