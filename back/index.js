var  cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;

require('dotenv').config();
require('./utils/db')
app.use(express.json());
const path = require('path');
var fileUpload = require('express-fileupload')
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000','http://localhost:3003','http://localhost:3004']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);


const myMiddleware = (req, res, next) => {
    console.log('This is my middleware:', req.originalUrl);
    next(); // Call the next middleware function
}

module.exports = myMiddleware;

app.use(myMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// routes
var  usersRouter = require("./routes/user");
var  imagesuploadRoutes = require("./routes/imageUploadRoutes");
var moviesRoutes = require("./routes/movie");
var screenRoutes = require("./routes/screen");
var foodRoutes = require("./routes/food");
var bookingRoutes = require("./routes/booking");
var offersRoutes = require("./routes/offer");
var paymentRoutes = require("./routes/payment");
var feedbackRoutes = require("./routes/feedback")
var EmployeeRoutes = require("./routes/employee")
// routes middleware
app.use('/user', usersRouter);
app.use('/image', imagesuploadRoutes);
// app.use('/admin', adminRoutes);
app.use('/movie', moviesRoutes);
app.use("/screen", screenRoutes);
app.use("/food", foodRoutes);
app.use("/booking", bookingRoutes);
app.use("/offer", offersRoutes);
app.use("/payment", paymentRoutes);
app.use("/feedback", feedbackRoutes);
app.use('/',EmployeeRoutes)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 