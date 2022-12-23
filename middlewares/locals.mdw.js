import fieldsService from "../services/fields.service.js";
import categoriesService from "../services/categories.service.js";
import serverVariablesService from "../services/server-variables.service.js";
import coursesService from "../services/courses.service.js";

export default function (app) {
    app.use(async function (req, res, next) {

        if (typeof req.session.auth === 'undefined') {
            req.session.auth = false;
            res.locals.authUser = null;
        }

        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;
        next();

    });

    app.use(async function (req, res, next) {
        const server = await serverVariablesService.findById(1);
        const then = new Date(server.lastReset);
        const now = new Date();
        const diffDays = Math.ceil(Math.abs(now - then) / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
            server.lastReset = now;
            await serverVariablesService.update(1, server);
            const courseList = await coursesService.findAll();
            for (const c of courseList) {
                if (c.weekStudentNum === null)
                    c.weekStudentNum = 0;
                c.lwStudentNum = c.weekStudentNum;
                c.weekStudentNum = 0;
                await coursesService.update(c.courseID, c);
            }
        }


        // Huy - locals Fields to show in navbar
        res.locals.lcFields = await fieldsService.findAllWithoutHidden();
        let fieldsLen = res.locals.lcFields.length;
        for (let i = 0; i < fieldsLen; i++) {
            res.locals.lcFields[i].lcCategories = await categoriesService.findAllByFieldIDWithoutHidden(res.locals.lcFields[i].fieldID);
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
        res.locals.curSearch = "Search...";
        // res.locals.lcUserID = 1;

        next();
    });
};