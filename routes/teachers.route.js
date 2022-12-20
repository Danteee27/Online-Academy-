//Phan Huy teacherRoute

import express from 'express';
import multer from 'multer';
import {google} from 'googleapis';
import FormData from "form-data";


import categoryService from '../services/users.service.js';
import coursesService from "../services/courses.service.js";
import teachersService from "../services/teachers.service.js";
import * as stream from 'stream';


//Declare for googleapis to up image to drive by Phan Huy
const CLIENT_ID = '345091189799-jbtgfco5dfbotdcloqr1ate4tl4d9ei5.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04yjgGbQzPuYeCgYIARAAGAQSNwF-L9IrodMsWdvsnSvZHNfIen98neAWdvPY7sDqIyHElOLYbv3DH54ZSqbQFeCKaCIyvMUTcqo';
const router = express.Router();
const upload = multer();

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
const drive = google.drive({version: "v3", auth: oauth2Client});
router.get('/', function (req, res) {
    res.render('home');
});

router.get('/addCourse', async function (req,res){
    const teachID = req.query.id;
    console.log(teachID);
    const teacher = await teachersService.findById(teachID);
    console.teacher;
    res.render('vwTeacher/addCourse', {
        teacher: teacher,
        layout: 'createC'
    });
});

// Upload image course to drive - Phan Huy
const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    console.log(bufferStream);
    const { data } = await drive.files.create({
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
router.post('/addCourse', upload.any(), async function (req,res)  {

    try {
        const { body, files } = req;
        const ret = await coursesService.add(body);
        console.log(ret);
        //const id = await  coursesService.findMaxId();
        //console.log(id)
        var image = null;
        for (let f = 0; f < files.length; f += 1) {
            image = await uploadFile(files[f]);
        }
        console.log(image);
        await coursesService.addImage(image, ret);
        //res.status(200).send('Form Submitted');
    } catch (f) {
        res.send(f.message);
    }
    res.redirect('/teacher/addLect');
});
// Phan Huy teacher route-profile
router.get('/profile', async function (req, res) {
    const userid = req.query.id;
    const teacher = await teachersService.findById(userid);
    const courses = await coursesService.findByUserId(userid);
    console.log(courses);
    if (teacher === null) {
        return res.render('/login');
    }
    res.render('vwTeacher/profile', {
        teacher: teacher,
        courses: courses
    });
});

router.get('/addLect', function (req, res) {
    res.render('vwTeacher/addLect', {
        layout: 'createC'
    });

});



export default router;