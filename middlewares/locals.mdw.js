import fieldsService from "../services/fields.service.js";
import categoriesService from "../services/categories.service.js";

export default function (app) {
    app.use(async function (req, res, next) {


        if (typeof req.session.auth === 'undefined') {
            req.session.auth = false;
        }

        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;
        next();
    });

    app.use(async function (req, res, next) {
        // Huy - locals Fields to show in navbar
        res.locals.lcFields = await fieldsService.findAll();
        let fieldsLen = res.locals.lcFields.length;
        for (let i = 0; i < fieldsLen; i++) {
            res.locals.lcFields[i].lcCategories = await categoriesService.findAllByFieldID(res.locals.lcFields[i].fieldID);
        }

        // Huy - locals title to show in html title
        res.locals.lcTitle = "Online Academy";

        // Huy - locals to active nav-item in navbar
        res.locals.lcHomePage = false;
        res.locals.lcCatPage = false;
        res.locals.lcAboutPage = false;
        res.locals.lcContactPage = false;
        res.locals.lcWishlistPage = false;
        res.locals.lcMyCoursesPage = false;

        // Huy - locals to store current course in order to set html title
        res.locals.curCourse;

        // res.locals.lcUserID = 1;

        next();
    });
};