"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var errorController_1 = __importDefault(require("./controllers/errorController"));
var appError_1 = __importDefault(require("./utils/appError"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
var adminProduct_1 = __importDefault(require("./routes/admin/adminProduct"));
var adminRoutes_1 = __importDefault(require("./routes/admin/adminRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var userProductRoutes_1 = __importDefault(require("./routes/userProductRoutes"));
var adminCategory_1 = __importDefault(require("./routes/admin/adminCategory"));
var adminUser_1 = __importDefault(require("./routes/admin/adminUser"));
var app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
dotenv_1.default.config({ path: './config.env' });
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public/images')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use('/', index_1.default);
app.use('/admin', adminCategory_1.default);
app.use('/admin', adminProduct_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/admin', adminUser_1.default);
app.use('/', authRoutes_1.default);
app.use('/user', userProductRoutes_1.default);
app.use(errorController_1.default);
app.all('*', function (req, res, next) {
    next(new appError_1.default("Sorry but we couldn't find " + req.originalUrl + " on this server!", 404));
});
exports.default = app;
