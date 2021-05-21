"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminController_1 = require("../../controllers/adminControllers/adminController");
var router = express_1.default.Router();
router.get("/users", adminController_1.getAllUsers);
router.delete("/users/:id", adminController_1.deleteUser);
exports.default = router;
