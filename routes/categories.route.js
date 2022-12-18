import express from 'express';
import categoriesService from "../services/categories.service.js";
import coursesService from "../services/courses.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await categoriesService.findAll();
    res.json(list);
})

router.get('/view/:id', async function(req, res) {
    const id = req.params.id || 0;
    const list = await categoriesService.findByFieldID(id);

    res.render('vwAdmin/byCategory', {
        list: list,
        empty: list.length === 0,
    });
})



export default router;