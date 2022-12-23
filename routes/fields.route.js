import express from 'express';
import fieldsService from "../services/fields.service.js";
import categoriesService from "../services/categories.service.js";
import coursesService from "../services/courses.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await fieldsService.findAll();
    res.render('vwAdmin/byField', {
        list: list,
        empty: list.length === 0,
    });
})

router.get('/view/:id', async function(req, res) {
    const fieldID = req.params.id || 0;
    const list = await categoriesService.findByFieldID(fieldID);

    res.json(list);
})

// ROLE.ADMIN ONLY
router.get('/add', function (req, res) {
    res.render('vwAdmin/vwField/add');
});

// ROLE.ADMIN ONLY
router.post('/add', async function (req, res) {

    const ret = await fieldsService.add(req.body);

    res.render('vwAdmin/vwField/add');
});

router.post('/unhide', async function(req, res) {

    const fieldID = req.body.fieldID || 0;



    const ret = await fieldsService.unhide(fieldID);

    res.redirect('/admin/fields');

})

router.post('/hide', async function(req, res) {

    const fieldID = req.body.fieldID || 0;


    const ret = await fieldsService.hide(fieldID);

    res.redirect('/admin/fields');

})

// ROLE.ADMIN ONLY
router.post('/del', async function(req, res) {

    const fieldID = req.body.fieldID || 0;

    const list = await categoriesService.findByFieldID(fieldID);
    let existed = false;
    for(let l in list)
    {
        let count = list[l].course_num;

        if(count > 0)
        {
            existed = true;
            break;
        }
    }

    if(existed == false) {
        console.log(fieldID);
        const ret = await fieldsService.del(fieldID);
        res.redirect('/admin/fields');
    }
    else
    {

    }
})

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const field = await fieldsService.findById(id);
    if (field === null) {
        return res.redirect('/admin/fields');
    }

    res.render('vwAdmin/vwField/edit', {
        field: field
    });
});

router.post('/edit', async function(req, res) {
    const fieldID = req.body.fieldID || 0;
    const affected_rows = await fieldsService.update(req.body.fieldID, req.body)

    res.redirect('/admin/fields');
})



export default router;