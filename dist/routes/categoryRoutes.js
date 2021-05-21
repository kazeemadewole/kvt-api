"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categoryController_1 = require("../controllers/adminControllers/categoryController");
var router = express_1.default.Router();
/* GET users listing. */
router.post('/add-category', categoryController_1.createCategory);
exports.default = router;
