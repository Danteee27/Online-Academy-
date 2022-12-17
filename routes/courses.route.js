import express from 'express';
import coursesService from "../services/courses.service.js";
import lecturesService from "../services/lectures.service.js";
import fieldsService from "../services/fields.service.js";


const router = express.Router();

router.get('/', async function(req, res) {
    const list = await coursesService.findAll();
    res.json(list);
})

router.get('/view/:id', async function(req, res) {
    const id = req.params.id || 0;
    const list = await coursesService.findByCategoryID(id);

    res.render('vwAdmin/byCourse', {
        list: list,
        empty: list.length === 0,
    });
})

router.post('/add', async function(req, res) {
    const ret = await coursesService.add(req.body);
})




export default router;