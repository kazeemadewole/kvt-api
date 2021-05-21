"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminController_1 = require("../../controllers/adminControllers/adminController");
var auth_1 = require("../../middlewares/auth");
var router = express_1.default.Router();
router.post("/login", adminController_1.loginAdmin);
router.post("/signup", adminController_1.createAdmin);
router.post('/logout', auth_1.auth, auth_1.adminAuth, adminController_1.adminLogout);
exports.default = router;
