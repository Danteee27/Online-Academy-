import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
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
    //console.log(req.body);
    res.render('vwTeacher/addCourse'); 
});

router.post('/addCourse', async function (req, res) {
    var courseName = req.body.inputCourseName;
    var instructor = req.body.inputLN;
    var imageURL = req.body.inputCourseIMG;
    var Des = req.body.editor;
    var price = req.body.inputCoursePrice;
    var discount = req.body.inputCourseDis;
    var max = req.body.inputStuNum;
    var field = req.body.inputCourseField;
    var cate = req.body.inputCourseCat;
    //console.log(req.body);
    const ret = await usersService.addCourse(1, courseName, instructor, 5, max, imageURL
        , price, discount, 10, Des, 1, 1);
    console.log(ret);
    var querry = `
	INSERT INTO courses
	(courseID, courseName, catID, instructor, hidden) 
	VALUES ("1", "${courseName}", "1", "${instructor}",1)
	`;
});



router.get('/editCourse', function (req, res) {
    
    res.render('vwTeacher/editCourse'); 
});

router.get('/addLect', function (req, res) {
    res.render('vwTeacher/addLect'); 
});






export default router;