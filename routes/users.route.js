import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import categoryService from '../services/users.service.js';
import usersService from "../services/users.service.js";
import coursesService from "../services/courses.service.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url)); 


router.get('/', function (req, res) {
    res.render('home');
});
// Phan Huy User route-profile
router.get('/profile', async function (req, res) {
    const userid = req.query.id;
    const user = await usersService.findById(userid);
    const courses = await coursesService.findByUserId(userid);
    if (user === null) {
        return res.render('/login');
    }
    res.render('vwTeacher/profile', {
        layout: 'simple',
        user: user,
        courses: courses
    });
});

router.get('/editProfile', async function (req, res) {
    //const userid = req.query.id;
    //const user = await usersService.findById(userid);
    //if (user === null) {
     //   return res.render('/login');
    //}
    res.render('vwTeacher/editProfile');
});

router.get('/addCourse', function (req, res) {
    res.render('vwTeacher/addCourse'); 
});

router.get('/editCourse', function (req, res) {
    res.render('vwTeacher/editCourse'); 
});

router.post('/addCourse', async function (req, res) {
    // console.log(req.body);
    const ret = await categoryService.add(req.body);
    // console.log(ret);
    res.render('vwCourse/add');
});




export default router;