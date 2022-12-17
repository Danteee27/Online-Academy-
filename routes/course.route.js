import express from 'express';
import courseService from '../services/course.service.js';
import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';

const router = express.Router();

router.get("/", function (req, res) {
    res.render('vwUser/courses');
});

router.get('/category/:id', async function (req, res) {
    const catID = req.params.id;


    const catName = await categoryService.findCatNameByCatID(catID);
    const fieldID = await categoryService.findFieldIDByCatID(catID);
    const fieldName = await fieldService.findFieldNameByFieldID(fieldID);

    const limit = 8;
    const total = await courseService.countByCatId(catID);
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
    const list = await courseService.findPageByCatID(catID, limit, offset);
    categoryService.addCatNameToCourse(list, catName);
    // console.log(list);
    res.render('vwUser/courses', {
        course: list,
        fieldName,
        catName,
        empty: list.length === 0,
        pageNumbers,
        prevPage: +page - 1,
        nextPage: +page + 1,
        hasPrevPage: +page > 1,
        hasNextPage: +page < nPages
    });
});

router.get('/detail', async function (req, res) {
    const catID = req.query.catID;
    const courseID = req.query.id;

    const course = await courseService.findByDetail(catID, courseID);

    res.render('vwUser/detail', {
        course
    })
});

export default router;