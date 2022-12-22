import express from 'express';
import lecturesService from "../services/lectures.service.js";

import multer from 'multer';
import {google} from 'googleapis';
import FormData from "form-data";



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
router.post('/add', upload.any(), async function (req,res)  {

    try {
        const { body, files } = req;
        const id = body.courseID;
        const ret = await lecturesService.add(body);
        console.log(ret);
        console.log(id)
        var video = null;
        for (let f = 0; f < files.length; f += 1) {
            video = await uploadFile(files[f]);
        }
        console.log(video);
        await lecturesService.addVideoID(video, ret);
        //res.status(200).send('Form Submitted');
        res.redirect('/teacher/course?id=' + id);
    } catch (f) {
        res.send(f.message);
    }
});

router.get('/add', async function (req, res) {
    const courseID = req.query.id;
    const lectures = await lecturesService.findByCourseID(courseID);
    console.log(lectures);
    res.render('vwTeacher/addLecture',{
        layout: 'LectureLayout',
        courseID:   courseID,
        lectures: lectures,
        });
})



export default router;