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

    const list = await courseService.findAllByCatID(catID);
    const catName = await categoryService.findCatNameByCatID(catID);
    const fieldID = await categoryService.findFieldIDByCatID(catID);
    const fieldName = await fieldService.findFieldNameByFieldID(fieldID);
    console.log(list);
    res.render('vwUser/courses', {
        course: list,
        fieldName,
        catName,
        empty: list.length === 0
    });
});

export default router;