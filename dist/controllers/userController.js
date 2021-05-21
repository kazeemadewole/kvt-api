"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.logout = exports.updateProfile = exports.userProfile = exports.login = exports.createUser = void 0;
var userSchema_1 = __importDefault(require("../models/userSchema"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var appError_1 = __importDefault(require("../utils/appError"));
exports.createUser = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSchema_1.default.create(__assign({}, req.body))];
            case 1:
                newUser = _a.sent();
                res.status(201).json({ status: "User created!", data: newUser });
                return [2 /*return*/];
        }
    });
}); });
var maxAge = 24 * 60 * 60;
exports.login = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, password = _a.password;
        userSchema_1.default.findOne({ email: email }).exec(function (error, user) {
            if (user) {
                bcrypt_1.default.compare(password, user.password).then(function (result) {
                    if (result) {
                        var token = jsonwebtoken_1.default.sign({ _id: user._id.toString(), role: user.role }, "RANDOM_TOKEN_SECRET", {
                            expiresIn: maxAge,
                        });
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        return res.status(200).json({
                            data: user,
                            token: token,
                        });
                    }
                    else {
                        throw error;
                    }
                }).catch(function (err) { return next(new appError_1.default("Unable to login!", 401)); });
            }
            else {
                return next(new appError_1.default("Please Register with us!!", 401));
            }
        });
        return [2 /*return*/];
    });
}); });
exports.userProfile = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).json({
                data: req.user,
            })];
    });
}); });
exports.updateProfile = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var image, url, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image = req.files.image;
                url = req.protocol + "://" + req.get("host");
                image = url + "/" + req.files[0].path;
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(req.user._id, __assign(__assign({}, req.body), image), {
                        new: true,
                        runValidators: true,
                    }).select('-password -tokens')];
            case 1:
                user = _a.sent();
                req.user = user;
                res.status(200).json({
                    status: "success",
                    data: user
                });
                return [2 /*return*/];
        }
    });
}); });
exports.logout = catchAsync_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            status: 'Logged out!'
        });
        return [2 /*return*/];
    });
}); });
