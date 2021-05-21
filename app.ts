import express from'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import errorHandler from './controllers/errorController'
import AppError from './utils/appError'
import dotenv from 'dotenv'

import indexRouter from './routes/index';
import adminProductRouter from './routes/admin/adminProduct';
import adminRouter from './routes/admin/adminRoutes';
import authRouter from './routes/authRoutes';
import userPostRouter from './routes/userProductRoutes';
import adminCategoryRouter from './routes/admin/adminCategory'
import adminUserRouter from './routes/admin/adminUser'

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

dotenv.config({path: './config.env'})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images')));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/', indexRouter);
app.use('/admin', adminCategoryRouter);
app.use('/admin', adminProductRouter)
app.use('/admin', adminRouter)
app.use('/admin', adminUserRouter)

app.use('/', authRouter);
app.use('/user', userPostRouter)

app.use(errorHandler)
app.all('*', (req, res, next) => {
  next(new AppError(`Sorry but we couldn't find ${req.originalUrl} on this server!`, 404))
})

export default app;
