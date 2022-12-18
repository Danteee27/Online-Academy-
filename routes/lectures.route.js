import express from 'express';
import lecturesService from "../services/lectures.service.js";
import categoriesService from "../services/categories.service.js";
import coursesService from "../services/courses.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await lecturesService.findAll();
    res.json(list);
})

router.get('/view/:id', async function(req, res) {
    const id = req.params.id || 0;
    const list = await lecturesService.findByCourseID(id);

    res.render('vwAdmin/byLecture', {
        list: list,
        empty: list.length === 0,
    });
})


export default router;