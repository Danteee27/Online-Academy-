import express from 'express';
import coursesService from '../services/courses.service.js';
import teachersService from '../services/teachers.service.js';
import numeral from 'numeral';
import categoriesService from '../services/categories.service.js';

const router = express.Router();

router.get("/", function (req, res) {
    res.render('search');
});

router.post('/view', function (req, res) {
    const searchStr = req.body.search;
    return res.redirect(`/search/view?value=${searchStr}`);
})

router.get('/view', async function (req, res) {
    const max = 100000;
    const searchStr = req.query.value || ' ';
    var sortType = req.query.sort || 'most-relevant';
    const catID = req.query.catID || 0;
    var totalRes = 0;
    var course;
    var temp;
    switch (sortType) {
        case 'most-relevant':
            course = await coursesService.fulltextSearch(searchStr, 8, 0, catID);
            temp = await coursesService.fulltextSearch(searchStr, max, 0, catID);
            break;
        case 'highest-rated':
            course = await coursesService.fulltextSearchHighestRated(searchStr, 8, 0, catID);
            temp = await coursesService.fulltextSearchHighestRated(searchStr, max, 0, catID);
            break;
        case 'newest':
            course = await coursesService.fulltextSearchNewest(searchStr, 8, 0, catID);
            temp = await coursesService.fulltextSearchNewest(searchStr, max, 0, catID);
            break;
        case 'price-low-high':
            course = await coursesService.fulltextSearchPrice(searchStr, 8, 0, 'asc', catID);
            temp = await coursesService.fulltextSearchPrice(searchStr, max, 0, 'asc', catID);
            break;
        case 'price-high-low':
            course = await coursesService.fulltextSearchPrice(searchStr, 8, 0, 'desc', catID);
            temp = await coursesService.fulltextSearchPrice(searchStr, max, 0, 'desc', catID);
            break;
    }
    if (temp !== null)
        totalRes = temp.length
    res.locals.search = true;
    res.locals.searchStr = searchStr;
    let len = 0;
    if (course !== null) {
        len = course.length;
        for (const c of course) {
            const category = await categoriesService.findByIdWithoutHidden(c.catID);
            if (category !== null)
                c.catName = category.catName;
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
    }

    const categories = await categoriesService.findAllWithoutHidden();
    for (const c of categories) {
        if (+c.catID === +catID)
            c.isSelected = true;
    }
    res.render('search', {
        course,
        searchStr,
        empty: len === 0,
        totalRes,
        sortType,
        categories
    })
});

router.post('/filter', async function (req, res) {
    const sort = req.body.sort;
    const category = req.body.category;
    const searchStr = req.body.searchStr;

    return res.redirect(`/search/view?sort=${sort}&value=${searchStr}&catID=${category}`);
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