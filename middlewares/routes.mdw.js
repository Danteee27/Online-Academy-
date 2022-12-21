

import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";
import lecturesRoute from "../routes/lectures.route.js";
import teachersRoute from "../routes/teachers.route.js";
import usersRoute from "../routes/users.route.js";


export default function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.use('/teacher', teachersRoute);
    app.use('/lectures', lecturesRoute);

    app.use('/user', usersRoute);

    app.get('/admin', function (req, res) {
        res.render('vwAdmin/index')
    });



    app.use('/courses', coursesRoute);
    app.use('/fields', fieldsRoute);
    app.use('/categories', categoriesRoute);

}