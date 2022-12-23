import express from 'express';
import coursesService from '../services/courses.service.js';
import teachersService from '../services/teachers.service.js';
import numeral from 'numeral';

const router = express.Router();

router.get("/", function (req, res) {
    res.render('search');
});

router.post('/view', function (req, res) {
    const searchStr = req.body.search;
    return res.redirect(`/search/view?value=${searchStr}`);
})

router.get('/view', async function (req, res) {
    const searchStr = req.query.value;
    const course = await coursesService.fulltextSearch(searchStr, 8, 0);
    res.locals.curSearch = searchStr;

    for (const c of course) {
        const teacher = await teachersService.findById(c.teacherID);
        if (teacher !== null) {
            c.instructor = teacher.teacherName;
        }
        let now = new Date();
        let then = new Date(c.update);
        let months = (now.getFullYear() - then.getFullYear()) * 12;
        months -= then.getMonth();
        months += now.getMonth();
        if (months <= 1)
            c.isNew = true;
        else
            c.isNew = false;
        if (+c.student_num >= 1000)
            c.isBestseller = true;
        else
            c.isBestseller = false;
        c.hasPromotion = false;
        if (c.promotion != 0) {
            c.hasPromotion = true;
        }
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +c.rating)
                star.push({
                    star: true,
                    starHalf: false
                });
            else if (j - +c.rating < 1)
                star.push({
                    star: false,
                    starHalf: true
                });
            else
                star.push({
                    star: false,
                    starHalf: false
                });
        }
        c.star = star;
    }
    const totalRes = await coursesService.fulltextSearchResCount(searchStr);
    res.render('search', {
        course,
        searchStr,
        empty: course.length === 0,
        totalRes
    })
});

router.post('/getMore', async function (req, res) {
    const offset = req.query.offset;
    const searchStr = req.query.value;
    const course = await coursesService.fulltextSearch(searchStr, 8, offset);
    if (course === null)
        return res.json(false);
    for (const c of course) {
        const teacher = await teachersService.findById(c.teacherID);
        if (teacher !== null) {
            c.instructor = teacher.teacherName;
        }
        let now = new Date();
        let then = new Date(c.update);
        let months = (now.getFullYear() - then.getFullYear()) * 12;
        months -= then.getMonth();
        months += now.getMonth();
        if (months <= 1)
            c.isNew = true;
        else
            c.isNew = false;
        if (+c.student_num >= 1000)
            c.isBestseller = true;
        else
            c.isBestseller = false;
        c.hasPromotion = false;
        if (c.promotion != 0) {
            c.hasPromotion = true;
        }
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +c.rating)
                star.push({
                    star: true,
                    starHalf: false
                });
            else if (j - +c.rating < 1)
                star.push({
                    star: false,
                    starHalf: true
                });
            else
                star.push({
                    star: false,
                    starHalf: false
                });
        }
        c.star = star;
        c.promotion = numeral(+c.promotion).format(0, 0);
        c.rating_num = numeral(+c.rating_num).format(0, 0);
        c.price = numeral(+c.price).format(0, 0);
    }
    res.json(course);
});

export default router;