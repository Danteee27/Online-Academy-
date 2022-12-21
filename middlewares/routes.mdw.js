import {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';
import express from "express";

import categoryRoute from '../routes/category.route.js';
import courseRoute from '../routes/course.route.js';
import lectureRoute from '../routes/lecture.route.js';
import wishlistRoute from '../routes/wishlist.route.js';
import myCourseRoute from '../routes/my-course.route.js';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

export default function (app) {
    app.get('/', function (req, res) {
        res.locals.lcHomePage = true;
        res.render("home");
    });

    app.get('/err', function (req, res) {
        throw new Error('Something broke!!!');
    });

    app.use('/public', express.static('public'));
    app.use('/course', courseRoute);
    app.use('/lecture', lectureRoute);
    app.use('/wishlist', wishlistRoute);
    app.use('/my-course', myCourseRoute);

}