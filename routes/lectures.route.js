import express from "express";
import lecturesService from "../services/lectures.service.js";
import feedbacksService from "../services/feedbacks.service.js";
import userLecturesService from "../services/user-lectures.service.js";
import coursesService from "../services/courses.service.js";

import multer from "multer";
import { google } from "googleapis";
// import FormData from "form-data";

import * as stream from "stream";
import categoriesService from "../services/categories.service.js";
import myCoursesService from "../services/my-courses.service.js";

//Declare for googleapis to up image to drive by Phan Huy
const CLIENT_ID =
  "345091189799-jbtgfco5dfbotdcloqr1ate4tl4d9ei5.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04yjgGbQzPuYeCgYIARAAGAQSNwF-L9IrodMsWdvsnSvZHNfIen98neAWdvPY7sDqIyHElOLYbv3DH54ZSqbQFeCKaCIyvMUTcqo";
const router = express.Router();
const upload = multer();

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

router.get("/users/:id", async function (req, res) {
  if (req.session.authUser === null) {
    return res.redirect("/");
  }
  const lecID = req.params.id || 0;

  const userID = res.locals.authUser.userID;

  userLecturesService.setDate(userID, lecID);

  const lecture = await lecturesService.findByIdWithoutHidden(lecID);
  if (lecture === null) return res.redirect("/");

  const course = await coursesService.findByIdWithoutHidden(lecture.courseID);
  if (course === null) return res.redirect("/");

  if (course.views === null) course.views = 0;

  course.views += 1;
  await coursesService.update(course.courseID, course);

  res.locals.lcTitle = course.courseName + " | " + res.locals.lcTitle;
  const listLecture = await lecturesService.findAllByCourseID(lecture.courseID);
  for (let i = 0; i < listLecture.length; i++) {
    const status = await userLecturesService.getStatus(
      userID,
      listLecture[i].lecID
    );
    listLecture[i].isCompleted = status;
    if (listLecture[i].lecID === +lecID) listLecture[i].isActive = true;
  }

  //const views = lecture.views + 0;

  const feedbacks = await feedbacksService.findByCourseID(lecture.courseID);

  let tutorialRating = 0.0;
  let countRateList = [0, 0, 0, 0, 0];
  if (feedbacks != null) {
    for (let i = 0; i < feedbacks.length; i++) {
      tutorialRating += feedbacks[i].rating / feedbacks.length;
      countRateList[feedbacks[i].rating - 1] =
        countRateList[feedbacks[i].rating - 1] + 1.0;
    }
    tutorialRating = Math.round(tutorialRating * 100) / 100;
    tutorialRating = tutorialRating.toFixed(1);
    //console.log(tutorialRating);
  }

  const rating = [1, 2, 3, 4, 5];

  if (feedbacks != null) {
    for (let item = 0; item < countRateList.length; item++) {
      countRateList[item] =
        Math.round((countRateList[item] * 10000) / feedbacks.length) / 100;
    }
  }
  const fbList = await feedbacksService.findByCourseIDWithLimit(
    lecture.courseID,
    4
  );
  for (let i = 0; i < fbList.length; i++) {
    const star = [];
    for (let j = 1; j <= 5; j++) {
      if (j <= +fbList[i].rating) star.push(true);
      else star.push(false);
    }
    fbList[i].star = star;
    fbList[i].avatar = fbList[i].author[0];
  }

  let len = 0;
  if (feedbacks != null) len = feedbacks.length;

  res.render("vwStudent/lectures", {
    lectures: listLecture,
    lecture,
    countRateList,
    tutorialRating,
    fbList,
    // fieldName,
    // courseName,
    empty: lecture.length === 0,
    totalFb: len,
  });
});

router.get("/admin-view/:id", async function (req, res) {
  const courseID = req.params.id;

  const list = await lecturesService.findByCourseID(courseID);

  res.render("vwAdmin/byLecture", {
    list: list,
    empty: list.length === 0,
    courseID,
  });
});

router.get("/admin-view/detail/:id", async function (req, res) {
  const lecID = req.params.id;

  const lec = await lecturesService.findById(lecID);
  console.log("Lecture:" + lec);

  res.render("vwAdmin/vwLecture/detail", {
    lecture: lec,
  });
});

router.get("/view/:id", async function (req, res) {
  const id = req.params.id || 0;
  const list = await lecturesService.findByCourseID(id);

  res.render("vwAdmin/byLecture", {
    list: list,
    empty: list.length === 0,
  });
});

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  console.log(bufferStream);
  const { data } = await drive.files.create({
    requestBody: {
      name: fileObject.originalname,
      parents: ["10NUhaNUQ_4fH_VJ2YaGMQ3MWFaMqtnmL"],
    },
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
  return data.id;
};
router.post("/add", upload.any(), async function (req, res) {
  const { body, files } = req;
  const teacherID = body.teacherID;
  delete body.teacherID;
  const id = body.courseID;
  console.log(id);
  const course = await coursesService.findById(id);
  const catID = course.catID;
  const ret = await lecturesService.add(body);
  var video = null;
  for (let f = 0; f < files.length; f += 1) {
    video = await uploadFile(files[f]);
  }
  console.log(video);
  if (video !== undefined) {
    await lecturesService.addVideoID(video, ret);
  }
  //res.status(200).send('Form Submitted');
  if (body !== undefined) {
    await coursesService.updateDate(id);
    await coursesService.checkCompleted(id);
  }

  const userList = await myCoursesService.findAllUserIDByCourseID(id);
  // console.log(userList);
  if (userList.length !== 0) {
    for (let user of userList) {
      const lecture = await lecturesService.findByCourseID(id);
      const lecID = lecture[lecture.length - 1].lecID;
      await userLecturesService.add({
        userID: user.userID,
        lecID,
        completed: 0,
        courseID: id,
        date: null,
      });
    }
  }

  // console.log(body);
  res.redirect(`/user-courses/detail?catID=${catID}&id=${id}`);
});

router.get("/add", async function (req, res) {
  const courseID = req.query.id;
  const lectures = await lecturesService.findAllByCourseIDWithoutHidden(
    courseID
  );
  const course = await coursesService.findById(courseID);
  console.log(lectures);
  res.render("vwTeacher/addLecture", {
    layout: "main1",
    course: course,
    lectures: lectures,
  });
});

router.post("/user-lectures/update", async function (req, res) {
  const userID = req.query.userID;
  const lecID = req.query.lecID;
  const isChecked = req.query.status;
  await userLecturesService.update(userID, lecID, isChecked);
});

export default router;
