import express from 'express';
import courseService from '../services/course.service.js';
import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';
import lectureService from "../services/lecture.service.js";
import feedbackService from "../services/feedback.service.js";

const router = express.Router();

router.get("/", function (req, res) {
    res.render('vwUser/courses');
});

router.get('/:id', async function (req, res) {
    const lecID = req.params.id || 0;


    const list = await lectureService.findByLectureID(lecID);
    const lecture = list[0];
    // const lecture = await lectureService.findByLectureID(lecID);
    const listLecture = await lectureService.findAllByCourseID(lecture.courseID);
    const feedbacks = await feedbackService.findByCourseID(lecture.courseID);

    let tutorialRating = 0;
    let countRateList = [0, 0, 0, 0, 0];
    for (let item of feedbacks) {
        tutorialRating += item.rating / feedbacks.length;
        countRateList[item.rating-1] = countRateList[item.rating-1] + 1.0;
    }
    tutorialRating = Math.round(tutorialRating * 100) / 100;

    const rating = [1, 2, 3, 4, 5];


    for (let item = 0; item < countRateList.length; item++) {
        countRateList[item] = Math.round(countRateList[item] * 10000 / feedbacks.length) / 100;
        console.log(countRateList);

    }

    res.render('vwStudent/lecture', {
        lectures: listLecture,
        lecture,
        countRateList,
        tutorialRating,
        feedbacks,
        // fieldName,
        // courseName,
        empty: list.length === 0
    });
});

export default router;