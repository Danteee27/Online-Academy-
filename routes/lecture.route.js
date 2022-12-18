import express from 'express';
import courseService from '../services/course.service.js';
import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';
import lectureService from "../services/lecture.service.js";

const router = express.Router();

router.get("/", function (req, res) {
    res.render('vwUser/courses');
});

router.get('/:id', async function (req, res) {
    const lecID = req.params.id || 0;

    // const list = await courseService.findAllByCatID(catID);
    // const catName = await categoryService.findCatNameByCatID(catID);
    // const fieldID = await categoryService.findFieldIDByCatID(catID);
    // const fieldName = await fieldService.findFieldNameByFieldID(fieldID);
    const list = await lectureService.findByLectureID(lecID);
    // const couID = await lectureService.findCoureIDByLectureID(lecID)
    // const course = await lectureService.findAllByCourseID(couID)
    // console.log("course : " + couID)
    const lecture = list[0];
    const listLecture = await lectureService.findAllByCourseID(lecture.courseID);
    if(lecID === 0)
        console.log("okeconde");
    else
        console.log(lecID);
    res.render('vwStudent/lecture', {
        lectures: listLecture,
        lecture,
        // fieldName,
        // courseName,
        empty: list.length === 0
    });
});

export default router;