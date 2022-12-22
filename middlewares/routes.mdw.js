


import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";
import lecturesRoute from "../routes/lectures.route.js";
import wishlistsRoute from "../routes/wishlists.route.js";
import myCoursesRoute from "../routes/my-courses.route.js";
import userCoursesRoute from "../routes/user-courses.route.js";
import usersRoute from "../routes/users.route.js"

import teachersRoute from "../routes/teachers.route.js";


export default function (app) {
    app.get('/', function (req, res) {
        res.locals.lcHomePage = true;
        res.render('home',{layout:'main1'});
    });

    app.get('/admin', function (req, res) {
        res.render('vwAdmin/index')
    });





    app.use('/courses', coursesRoute);
    app.use('/fields', fieldsRoute);
    app.use('/categories', categoriesRoute);
    app.use('/lectures', lecturesRoute);
    app.use('/wishlists', wishlistsRoute);
    app.use('/my-courses', myCoursesRoute);
    app.use('/user-courses', userCoursesRoute);
    app.use('/users', usersRoute);
    
    app.use('/teacher', teachersRoute);
    app.use('/lectures', lecturesRoute);
}
