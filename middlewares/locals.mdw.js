import categoriesService from '../services/categories.service.js';
import fieldsService from '../services/fields.service.js';

export default function (app) {
    app.use(async function (req, res, next) {
        res.locals.lcFields = await fieldsService.findAll();
        let fieldLen = res.locals.lcFields.length;
        for (let i = 0; i < fieldLen; i++) {
            res.locals.lcFields[i].lcCategories = await categoriesService.findByFieldID(res.locals.lcFields[i].fieldID);
        }
        res.locals.lcTitle = "Online Academy";

        res.locals.lcHomePage = false;
        res.locals.lcCatPage = false;
        res.locals.lcAboutPage = false;
        res.locals.lcContactPage = false;
        // res.locals.lcCategories = await categoryService.findAll();
        res.locals.curCourse;
        next();
    });
};