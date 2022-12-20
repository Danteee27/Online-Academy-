import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';

export default function (app) {
    app.use(async function (req, res, next) {
        res.locals.lcFields = await fieldService.findAll();
        let fieldLen = res.locals.lcFields.length;
        for (let i = 0; i < fieldLen; i++) {
            res.locals.lcFields[i].lcCategories = await categoryService.findAllByField(res.locals.lcFields[i].fieldID);
        }
        res.locals.lcTitle = "Online Academy";

        res.locals.lcHomePage = false;
        res.locals.lcCatPage = false;
        res.locals.lcAboutPage = false;
        res.locals.lcContactPage = false;
        res.locals.lcWishlistPage = false;
        res.locals.lcMyCoursePage = false;

        res.locals.curCourse;

        res.locals.lcUserID = 1;

        next();
    });
};