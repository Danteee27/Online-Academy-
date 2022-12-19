import express from 'express';
import coursesService from "../services/courses.service.js";
import lecturesService from "../services/lectures.service.js";
import fieldsService from "../services/fields.service.js";
import categoriesService from "../services/categories.service.js";
import CategoriesService from "../services/categories.service.js";


const router = express.Router();

router.get('/', async function(req, res) {
    const list = await coursesService.findAll();
    res.json(list);
})

router.get('/view/:id', async function(req, res) {
    const id = req.params.id || 0;
    console.log(id);
    const list = await coursesService.findByCategoryID(id);

    const cat = await categoriesService.findById(id)

    res.render('vwAdmin/byCourse', {
        list: list,
        empty: list.length === 0,
        fieldID: cat.fieldID
    });
})


// ROLE.ADMIN ONLY

router.post('/unhide', async function(req, res) {

    const courseID = req.body.courseID || 0;

    const course = await coursesService.findById(courseID);


    const ret = await coursesService.unhide(courseID);

    res.redirect('/courses/view/' + course.catID);

})

router.post('/hide', async function(req, res) {

    const courseID = req.body.courseID || 0;

    const course = await coursesService.findById(courseID);


    const ret = await coursesService.hide(courseID);

    res.redirect('/courses/view/' + course.catID);

})

// ROLE.ADMIN ONLY
router.post('/del', async function(req, res) {

    const courseID = req.body.courseID || 0;

    const course = await coursesService.findById(courseID);





    const ret = await coursesService.del(courseID);
    res.redirect('/courses/view/' + course.catID);


})

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const course = await coursesService.findById(id);
    const cat = await categoriesService.findById(course.catID);

    if (course === null) {
        res.redirect('/courses/view/' + course.catID);
    }

    res.render('vwAdmin/vwCourse/edit', {
        course: course,
        fieldID: cat.fieldID
    });
});

router.post('/edit', async function(req, res) {
    const courseID = req.body.courseID || 0;
    const affected_rows = await coursesService.update(req.body.courseID, req.body)
    const course = await coursesService.findById(courseID);
    res.redirect('/courses/view/' + course.catID)
})




export default router;