const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
//Handling Error
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
// Route
const toursRoute = require('./routes/natourRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const viewRoute = require('./routes/viewRoutes');

const app = express();

// 1) Global Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP HEADERS
app.use(helmet());

// development LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

// //preventing parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

//lIMIT REQUEST FROM SAME API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 Jam
  message: 'Too many request from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie Parser
app.use(cookieParser());

//Test Middleware
app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});

// console.log(process.env.NODE_ENV);
app.use('/', viewRoute);
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/booking', bookingRoute)

//Handling unhandled toutes
// app.all('*', (req, res, next) => {
//   // res.status(404).json({
//   //   status: 'fail',
//   //   message: `Can't find ${req.originalUrl} on this server!`
//   // });

//   // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
//   // err.statusCode = 400
//   // err.status = 'fail'
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// app.use((req, res, next) => {
//   console.log('Ini Midleware');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString()
//   next();
// });

//Handling Get
// app.get('/api/v1/tours', allTours);
// //Handling Post
// app.post('/api/v1/tours', postTour);
//Handling Url Paramters
// app.get('/api/v1/tours/:id', getTour);
// //Edit tours
// app.patch('/api/v1/tours/:id', editTour);
// //Delete
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
