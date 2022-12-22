//Phan Huy teacherRoute

import express from 'express';
import multer from 'multer';
import {
    google
} from 'googleapis';


import coursesService from "../services/courses.service.js";
import teachersService from "../services/teachers.service.js";
import * as stream from 'stream';
import db from "../utils/db.js";



//Declare for googleapis to up image to drive by Phan Huy
const CLIENT_ID = '345091189799-jbtgfco5dfbotdcloqr1ate4tl4d9ei5.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04yjgGbQzPuYeCgYIARAAGAQSNwF-L9IrodMsWdvsnSvZHNfIen98neAWdvPY7sDqIyHElOLYbv3DH54ZSqbQFeCKaCIyvMUTcqo';
const router = express.Router();
const upload = multer();



const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});
const drive = google.drive({
    version: "v3",
    auth: oauth2Client
});


router.get('/', function (req, res) {
    res.render('home');
});

router.get('/addCourse', async function (req, res) {
    const teachID = req.query.id;
    console.log(teachID);
    const teacher = await teachersService.findById(teachID);
    console.teacher;
    res.render('vwTeacher/addCourse', {
        teacher: teacher,
        layout: 'CreateCourseLayout'
    });
});

// Upload image course to drive - Phan Huy
const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    console.log(bufferStream);
    const {
        data
    } = await drive.files.create({
        requestBody: {
            name: fileObject.originalname,
            parents: ['1NZUxjhw6Rcol373vpiX7pEJRU6hGomJx'],
        },
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        fields: 'id,name',
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
};
router.post('/addCourse', upload.any(), async function (req, res) {

    try {
        const {
            body,
            files
        } = req;
        const id = body.courseID;
        const ret = await coursesService.add(body);
        console.log(ret);
        console.log(id)
        var image = null;
        for (let f = 0; f < files.length; f += 1) {
            image = await uploadFile(files[f]);
        }
        console.log(image);
        await coursesService.addImage(image, ret);
        //res.status(200).send('Form Submitted');
        res.redirect('/lectures/add?id=' + ret);
    } catch (f) {
        res.send(f.message);
    }
});
// Phan Huy teacher route-profile
router.get('/profile', async function (req, res) {
    const userid = req.query.id;
    const teacher = await teachersService.findById(userid);
    const courses = await coursesService.findByUserId(userid);
    //var doc = new DOMParser().parseFromString(teacher.description, "text/xml");
    //console.log(doc);
    //console.log(courses);
    if (teacher === null) {
        return res.render('/login');
    }
    res.render('vwTeacher/profile', {
        teacher: teacher,
        courses: courses
    });
});

router.get('/profile/edit', async function (req, res) {
    const teacherID = req.query.id;
    const teacher = await teachersService.findById(teacherID);
    //console.log(teacher);
    //console.log(teacherID)
    if (teacher === null) {
        return res.render('/login');
    }
    res.render('vwTeacher/editProfile', {
        teacher: teacher,
    });
});


router.post('/profile/edit', upload.any(), async function (req, res) {

    try {
        const id = req.query.id;
        //console.log(id);
        const {
            body,
            files
        } = req;
        const ret = await teachersService.updateTeacher(body, id);
        //console.log('hello' + ret);

        var image = [];
        for (let f = 0; f < files.length; f += 1) {
            image.push(await uploadFile(files[f]));
        }
        //console.log(image[0]);
        //console.log(image[1]);
        //console.log(id);
        if (image[0] !== undefined) {
            teachersService.addAVA(image[0], id);
        }
        if (image[1] !== undefined) {
            teachersService.addBG(image[1], id);
        }
        //res.status(200).send('Form Submitted');
        //res.redirect('/teacher/profile?id=' + id);
        res.redirect('back');
    } catch (f) {
        res.send(f.message);
    }
});


// Phan Huy route get editCourse
router.get('/editCourse', async function (req, res) {
    const courseID = req.query.id;
    const course = await coursesService.findById(courseID);
    res.render('vwTeacher/editCourse', {
        layout: 'CreateCourseLayout',
        course: course
    })
});
// Phan Huy route post editCourse
router.post('/editCourse', upload.any(), async function (req, res) {

    try {
        const id = req.query.id;
        const {
            body,
            files
        } = req;
        //console.log(body);
        //console.log(id)
        const ret = await coursesService.update(id, body);
        //console.log(ret);
        var image = null;
        for (let f = 0; f < files.length; f += 1) {
            image = await uploadFile(files[f]);
        }
        console.log(image);
        if (image !== null) {
            await coursesService.addImage(image, id);
        }
        //res.status(200).send('Form Submitted');
        res.redirect('/lectures/add?id=' + id);
    } catch (f) {
        res.send(f.message);
    }
});

// Phan Huy route get editTeacher
router.get('/delCourse', async function (req, res) {
    const id = req.query.id;
    //console.log(id);
    const course = await coursesService.findById(id);
    //console.log('hello java' + course.teacherNumber);
    if (id !== null) {
        await coursesService.hide(id);
    }
    res.redirect('/teacher/profile?id=' + course.teacherID);
});
router.get('/getId', async function (req, res) {
    const teacher = await teachersService.findByUserId(req.query.id);
    res.redirect('/teacher/profile?id=' + teacher.teacherID);
});

export default router;
