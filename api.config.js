const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const UserProfileRoute = require('./routes/Account/Account/UserProfileRoute');
const ShopRoute = require('./routes/Account/Shop/ShopRoute');
const CertificationRoute = require('./routes/Account/Shop/CertificationRoute');
const VideoRoute = require('./routes/Video/Video/VideoRoute');
const LessonRoute = require('./routes/Lesson/Lesson/LessonRoute');
const BannerRoute = require('./routes/PageHome/Home/BannerRoute');
const CategoryRoute = require('./routes/PageHome/Home/CategoryRoute');
const FreeVideoRoute = require('./routes/PageHome/Home/FreeVideoRoute');
const ListADSInCategoryRoute = require('./routes/Category/Category/ListADSInCategoryRoute');
const ListVideoInCategoryRoute = require('./routes/Category/Category/ListVideoInCategoryRoute');
const OldMainMenuRoute = require('./routes/Category/Category/OldMainMenuRoute');
const OldListAllCategoryRoute = require('./routes/Category/Category/OldListAllCategoryRoute');
const CategoryTwoRoute = require('./routes/HomeMain/Home/CategoryTwoRoute');
const FavoriteProductRoute = require('./routes/PageProduct/Product/FavoriteProductRoute');
const FollowOwnerRoute = require('./routes/PageProduct/Product/FollowOwnerRoute');
const ListCommentRoute = require('./routes/PageProduct/Product/ListCommentRoute');
const ListReportRoute = require('./routes/PageProduct/Product/ListReportRoute');
const ProductInfoRoute = require('./routes/PageProduct/Product/ProductInfoRoute');
const ReportProductRoute = require('./routes/PageProduct/Product/ReportProductRoute');
const TermOfUseRoute = require('./routes/Others/Information/TermOfUseRoute');
// const DatabaseCloud = "mongodb://admin_blackboard:UeE9p5EQsQzN9NzY@cluster0-shard-00-00-quvbp.mongodb.net:27017,cluster0-shard-00-01-quvbp.mongodb.net:27017,cluster0-shard-00-02-quvbp.mongodb.net:27017/blackboard?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
// const databaseClient = 'mongodb://127.0.0.1:27017/blackboard'
// mongoose.connect(, { autoIndex: false });
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;
module.exports = (app) => {


    //handle mongo error
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
    });


    //use sessions for tracking logins
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db
        })
    }));

    // parse incoming requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.use('/api', UserProfileRoute);
    app.use('/api', ShopRoute);
    app.use('/api', CertificationRoute);
    app.use('/api', VideoRoute);
    app.use('/api', LessonRoute);
    app.use('/api', BannerRoute);
    app.use('/api', CategoryRoute);
    app.use('/api', FreeVideoRoute);
    app.use('/api', ListADSInCategoryRoute);
    app.use('/api', ListVideoInCategoryRoute);
    app.use('/api', OldMainMenuRoute);
    app.use('/api', OldListAllCategoryRoute);
    app.use('/api', CategoryTwoRoute);

    app.use('/api', FavoriteProductRoute);
    app.use('/api', FollowOwnerRoute);
    app.use('/api', ListCommentRoute);
    app.use('/api', ListReportRoute);
    app.use('/api', ProductInfoRoute);
    app.use('/api', ReportProductRoute);

    app.use('/api', TermOfUseRoute);
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //   var err = new Error('File Not Found');
    //   err.status = 404;
    //   next(err);
    // });

    // error handler
    // define as the last app.use callback
    // app.use(function (err, req, res, next) {
    //   res.status(err.status || 500);
    //   res.send(err.message);
    // });
};