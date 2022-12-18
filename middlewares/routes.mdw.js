
import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";
import lecturesRoute from "../routes/lectures.route.js";

export default function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/admin', function (req, res) {
        res.render('vwAdmin/index')
    })

    app.get('/addCourse', function (req, res) {
        res.render('Teacher/addCourse')
    })

    app.use('/courses', coursesRoute);
    app.use('/fields', fieldsRoute);
    app.use('/categories', categoriesRoute);
    app.use('/lectures', lecturesRoute);

}