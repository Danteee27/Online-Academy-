import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';

export default function (app) {
    app.use(async function (req, res, next) {
        res.locals.lcFields = await fieldService.findAll();
        // console.log(res.locals.lcFields);
        res.locals.lcCategories = await categoryService.findAll();

        next();
    });
};