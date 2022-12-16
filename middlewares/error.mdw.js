import fieldService from "../services/field.service.js";
import categoryService from "../services/category.service.js";


export default function (app) {
    app.use(( req, res, next) => {
        res.render('404',{layout:false});
    });

    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.render('500',{layout:false});
    });
};