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
    const listLecture = await lectureService.findAllByCourseID(lecture.courseID);
    const feedbacks = await feedbackService.findByCourseID(lecture.courseID);

    let tutorialRating = 0;
    let countRateList = [0,0,0,0,0];
    for(let item of feedbacks)
    {
        tutorialRating += item.rating/feedbacks.length;
        countRateList[item.rating] = countRateList[item.rating] + 1.0;
    }
    tutorialRating = Math.round(tutorialRating*100)/100;

    const starList ={
        "1star":['fa-star','fa-star-o','fa-star-o','fa-star-o','fa-star-o'],
        "2star":['fa-star','fa-star','fa-star-o','fa-star-o','fa-star-o'],
        "3star":['fa-star','fa-star','fa-star','fa-star-o','fa-star-o'],
        "4star":['fa-star','fa-star','fa-star','fa-star','fa-star-o'],
        "5star":['fa-star','fa-star','fa-star','fa-star','fa-star'],
    }

    const fullStar = `<span class=\"fa fa-star-o\"></span><span class=\"fa fa-star-o\"></span>`;


    for(let item =0;item < countRateList.length;item++)
    {
        countRateList[item] = Math.round(countRateList[item]*10000/feedbacks.length)/100;
    }

    console.log(countRateList);


    res.render('vwStudent/lecture', {
        lectures: listLecture,
        lecture,
        countRateList,
        starList,
        tutorialRating,
        // fieldName,
        // courseName,
        empty: list.length === 0
    });
});

export default router;