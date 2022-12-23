import express from 'express';
import courseService from '../services/courses.service.js';
import myCourseService from '../services/my-courses.service.js';
import teachersService from '../services/teachers.service.js';

const router = express.Router();

router.get("/", async function (req, res) {
    if (req.session.authUser === null) {
        return res.redirect('/');
    }

    res.locals.lcMyCoursePage = true;
    res.locals.lcTitle = "My Courses | " + res.locals.lcTitle;

    const userID = res.locals.authUser.userID;

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
        let temp = await courseService.findByIdWithoutHidden(list[i].courseID);
        if (temp === null)
            continue;
        let tempTeacher = await teachersService.findById(temp.teacherID);
        if (tempTeacher !== null)
            temp.instructor = tempTeacher.teacherName;
        course.push(temp);
    }

    res.render('vwUser/my-courses', {
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