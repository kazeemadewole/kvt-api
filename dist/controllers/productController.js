"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.updateFavoriteProduct = exports.getFavoriteProductByUser = exports.getAllProductByUser = exports.getAllApprovedProduct = void 0;
var productSchema_1 = __importDefault(require("../models/productSchema"));
var slugify_1 = __importDefault(require("slugify"));
var appError_1 = __importDefault(require("../utils/appError"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getAllApprovedProduct = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.find({ status: "approved" }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' })];
            case 1:
                products = _a.sent();
                res.status(200).json({
                    status: "success",
                    length: products.length,
                    data: products,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllProductByUser = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.find({ createdBy: req.user._id }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' })];
            case 1:
                products = _a.sent();
                res.status(200).json({
                    status: "success",
                    length: products.length,
                    data: products,
                    Pending: products.filter(function (product) { return product.status === 'pending'; }),
                    Approved: products.filter(function (product) { return product.status === 'approved'; })
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getFavoriteProductByUser = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.find({ favorite: { $in: [req.user._id] } }).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' })];
            case 1:
                products = _a.sent();
                res.status(200).json({
                    status: "success",
                    length: products.length,
                    data: products,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.updateFavoriteProduct = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, productSchema_1.default.findByIdAndUpdate(id, { $push: { favorite: req.user._id } }, {
                        new: true
                    })];
            case 1:
                product = _a.sent();
                res.status(200).json({
                    status: "success",
                    data: product
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getProductById = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var singlePost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.findById(req.params.id).populate({ path: 'category', select: '_id category' }).populate({ path: 'createdBy', select: 'firstName lastName' })];
            case 1:
                singlePost = _a.sent();
                if (!singlePost) {
                    return [2 /*return*/, next(new appError_1.default("No post found with that Id", 404))];
                }
                res.status(200).json({
                    status: "success",
                    data: singlePost
                });
                return [2 /*return*/];
        }
    });
}); });
exports.createProduct = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var url, productImages, newPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.protocol + "://" + req.get("host");
                productImages = [];
                if (req.files.length > 0) {
                    productImages = req.files.map(function (file) { return url + "/" + file.path; });
                }
                return [4 /*yield*/, productSchema_1.default.create({
                        title: req.body.title,
                        description: req.body.description,
                        productImage: productImages,
                        contact: req.body.contact,
                        location: req.body.location,
                        createdBy: req.user._id,
                        category: req.body.category,
                        slug: slugify_1.default(req.body.title),
                        price: req.body.price
                    })];
            case 1:
                newPost = _a.sent();
                res.status(200).json({
                    status: "success",
                    data: newPost,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.updateProduct = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, productSchema_1.default.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true,
                    })];
            case 1:
                updatedProduct = _a.sent();
                if (!updatedProduct) {
                    return [2 /*return*/, next(new appError_1.default("No post found with that Id", 404))];
                }
                res.status(200).json({
                    status: "success",
                    data: updatedProduct,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.deleteProduct = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                deletedProduct = _a.sent();
                if (!deletedProduct) {
                    return [2 /*return*/, next(new appError_1.default("No post found with that Id", 404))];
                }
                res.status(200).json({
                    status: "success",
                    data: null,
                });
                return [2 /*return*/];
        }
    });
}); });
