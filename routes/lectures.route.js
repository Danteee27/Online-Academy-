import express from 'express';
import lecturesService from "../services/lectures.service.js";
import feedbacksService from "../services/feedbacks.service.js";
import userLecturesService from "../services/user-lectures.service.js";

import multer from 'multer';
import {
    google
} from 'googleapis';
// import FormData from "form-data";

import * as stream from 'stream';


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

router.get('/users/:id', async function (req, res) {
    const lecID = req.params.id || 0;

    const userID = res.locals.lcUserID;

    userLecturesService.setDate(userID, lecID);

    const lecture = await lecturesService.findById(lecID);
    //const lecture = list[0];
    // const lecture = await lectureService.findByLectureID(lecID);
    const listLecture = await lecturesService.findAllByCourseID(lecture.courseID);
    for (let i = 0; i < listLecture.length; i++) {
        const status = await userLecturesService.getStatus(userID, listLecture[i].lecID);
        listLecture[i].isCompleted = status;
        if (listLecture[i].lecID === +lecID)
            listLecture[i].isActive = true;
    }
    const feedbacks = await feedbacksService.findByCourseID(lecture.courseID);

    let tutorialRating = 0.0;
    let countRateList = [0, 0, 0, 0, 0];
    for (let item of feedbacks) {
        tutorialRating += item.rating / feedbacks.length;
        countRateList[item.rating - 1] = countRateList[item.rating - 1] + 1.0;
    }
    tutorialRating = Math.round(tutorialRating * 100) / 100;
    tutorialRating = tutorialRating.toFixed(1);
    console.log(tutorialRating);

    const rating = [1, 2, 3, 4, 5];


    for (let item = 0; item < countRateList.length; item++) {
        countRateList[item] = Math.round(countRateList[item] * 10000 / feedbacks.length) / 100;
    }

    res.render('vwStudent/lectures', {
        lectures: listLecture,
        lecture,
        countRateList,
        tutorialRating,
        feedbacks,
        // fieldName,
        // courseName,
        empty: lecture.length === 0,
        layout: 'main1'
    });
});

router.get('/', async function (req, res) {
    const list = await lecturesService.findAll();
    res.json(list);
})

router.get('/view/:id', async function (req, res) {
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
router.post('/add', upload.any(), async function (req, res) {

    try {
        const {
            body,
            files
        } = req;
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
    res.render('vwTeacher/addLecture', {
        layout: 'LectureLayout',
        courseID: courseID,
        lectures: lectures,
    });
    console.log(courseID);
});

router.post('/user-lectures/update', async function (req, res) {
    const userID = req.query.userID;
    const lecID = req.query.lecID;
    const isChecked = req.query.status;
    await userLecturesService.update(
        userID,
        lecID,
        isChecked
    );
});

export default router;