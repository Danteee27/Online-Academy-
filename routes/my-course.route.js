import express from 'express';
import courseService from '../services/course.service.js';
import myCourseService from '../services/my-course.service.js';

const router = express.Router();

router.get("/", async function (req, res) {
    res.locals.lcMyCoursePage = true;
    res.locals.lcTitle = "My Courses | " + res.locals.lcTitle;

    const userID = res.locals.lcUserID;

    const total = await myCourseService.countByUserID(userID);
    const limit = 8;
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) {
        nPages++;
    }
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await myCourseService.findByUserID(userID, limit, offset);

    let course = [];
    for (let i = 0; i < list.length; i++) {
        let temp = await courseService.findByID(list[i].courseID);
        course.push(temp);
    }

    res.render('vwUser/my-course', {
        course,
        pageNumbers,
        empty: list.length === 0,
        prevPage: +page - 1,
        nextPage: +page + 1,
        hasPrevPage: +page > 1,
        hasNextPage: +page < nPages
    });
});

export default router;