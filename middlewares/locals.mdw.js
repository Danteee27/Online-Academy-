import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';

export default function (app) {
    app.use(async function (req, res, next) {
        res.locals.lcFields = await fieldService.findAll();
        res.locals.lcFields[0].lcCategories = await categoryService.findAllByField(res.locals.lcFields[0].fieldID);
        // res.locals.lcCategories = await categoryService.findAll();

        next();
    });
};