
import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";
import lecturesRoute from "../routes/lectures.route.js";
import usersRoute from "../routes/users.route.js"

export default function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/admin', function (req, res) {
        res.render('vwAdmin/index')
    })



    app.use('/courses', coursesRoute);
    app.use('/fields', fieldsRoute);
    app.use('/categories', categoriesRoute);
    app.use('/lectures', lecturesRoute);
    app.use('/users', usersRoute);

}