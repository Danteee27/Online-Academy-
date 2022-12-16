
import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";

export default function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.use('/courses', coursesRoute);
    app.use('/fields', fieldsRoute);
    app.use('/categories', categoriesRoute);
}