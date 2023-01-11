import express from "express";
import courseService from "../services/courses.service.js";
import lecturesService from "../services/lectures.service.js";
import myCourseService from "../services/my-courses.service.js";
import teachersService from "../services/teachers.service.js";
import userLecturesService from "../services/user-lectures.service.js";
import myCoursesService from "../services/my-courses.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  if (req.session.authUser === null) {
    return res.redirect("/");
  }

  res.locals.lcMyCoursePage = true;
  res.locals.lcTitle = "My Courses | " + res.locals.lcTitle;

  const userID = res.locals.authUser.userID;

  const total = await myCourseService.countByUserID(userID);
  const limit = 12;
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) {
    nPages++;
  }
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: +page === i,
    });
  }

  const list = await myCourseService.findByUserID(userID, limit, offset);

  let courses = [];
  for (let i = 0; i < list.length; i++) {
    let course = await courseService.findByIdWithoutHidden(list[i].courseID);

    if (course === null) continue;

    let teacher = await teachersService.findById(course.teacherID);
    if (teacher !== null) {
      course.instructor = teacher.teacherName;
    }

    let lectures = await userLecturesService.findAllByCourseID(
      userID,
      list[i].courseID
    );
    course.progress = 0;
    if (lectures.length !== 0) {
      let completedLec = 0;
      for (let lecture of lectures) {
        if (+lecture.completed === 1) {
          completedLec += 1;
        }
      }
      completedLec = (completedLec / course.lec_num) * 100;
      course.progress = completedLec.toFixed(0);
      // console.log("progress " + completedLec);
    }

    courses.push(course);
  }

  res.render("vwUser/my-courses", {
    course: courses,
    pageNumbers,
    empty: list.length === 0,
    prevPage: +page - 1,
    nextPage: +page + 1,
    hasPrevPage: +page > 1,
    hasNextPage: +page < nPages,
  });
});

export default router;
