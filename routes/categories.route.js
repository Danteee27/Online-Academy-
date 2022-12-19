import express from 'express';
import categoriesService from "../services/categories.service.js";
import coursesService from "../services/courses.service.js";
import fieldsService from "../services/fields.service.js";

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
        fieldID: id
    });
})

router.get('/add/:id', function (req, res) {
    const id = req.params.id || 0;

    res.render('vwAdmin/vwCategory/add',{
        fieldID: id
    });
});

// ROLE.ADMIN ONLY
router.post('/add', async function (req, res) {

    const ret = await categoriesService.add(req.body);
    console.log(req.body);
    res.render('vwAdmin/vwCategory/add',
        {
            fieldID: req.body.fieldID
        });

});

// ROLE.ADMIN ONLY

router.post('/unhide', async function(req, res) {

    const catID = req.body.catID || 0;

    const cat = await categoriesService.findById(catID);


    const ret = await categoriesService.unhide(catID);
    res.redirect('/categories/view/' + cat.fieldID);

})

router.post('/hide', async function(req, res) {

    const catID = req.body.catID || 0;

    const cat = await categoriesService.findById(catID);


    const ret = await categoriesService.hide(catID);
    res.redirect('/categories/view/' + cat.fieldID);

})

router.post('/del', async function(req, res) {

    const catID = req.body.catID || 0;

    const cat = await categoriesService.findById(catID);

    const existed = cat.course_num > 0 || false;


    if(existed == false) {

        const ret = await categoriesService.del(catID);
        res.redirect('/categories/view/' + cat.fieldID);
    }
    else
    {

    }
})

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const category = await categoriesService.findById(id);
    if (category === null) {
        return res.redirect('/categories/' + id);
    }

    res.render('vwAdmin/vwCategory/edit', {
        category: category
    });
});

router.post('/edit', async function(req, res) {
    const catID = req.body.catID || 0;
    const affected_rows = await categoriesService.update(req.body.catID, req.body)
    const cat = await categoriesService.findById(catID);


    res.redirect('/categories/view/' + cat.fieldID);
})



export default router;