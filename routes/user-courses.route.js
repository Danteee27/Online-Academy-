import express from 'express';
import _ from 'lodash';
import courseService from '../services/courses.service.js';
import categoryService from '../services/categories.service.js';
import fieldService from '../services/fields.service.js';
import lectureService from '../services/lectures.service.js';
import feedbackService from '../services/feedbacks.service.js';
import wishlistService from '../services/wishlists.service.js';
import myCourseService from '../services/my-courses.service.js';
import {
    format
} from 'morgan';
import userLecturesService from '../services/user-lectures.service.js';
import teachersService from '../services/teachers.service.js';

const router = express.Router();

router.get("/", function (req, res) {
    res.locals.lcCatPage = true;
    res.render('vwUser/courses');
});

router.get('/category/:id', async function (req, res) {
    const catID = req.params.id;

    res.locals.lcCatPage = true;

    const cat = await categoryService.findById(catID);
    const catName = cat.catName;
    const fieldID = cat.fieldID;
    const field = await fieldService.findById(fieldID);
    const fieldName = field.fieldName;

    res.locals.lcTitle = catName + " | " + res.locals.lcTitle;

    const limit = 8;
    const total = await courseService.countByCategoryID(catID);
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
            isCurrent: +page === i
        });
    }
    const list = await courseService.findPageByCatID(catID, limit, offset);
    categoryService.addCatNameToCourse(list, catName);
    for (let i = 0; i < list.length; i++) {
        let tempTeacher = await teachersService.findById(list[i].teacherID);
        if (tempTeacher !== null)
            list[i].instructor = tempTeacher.teacherName;
    }

    for (let i = 0; i < list.length; i++) {
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +list[i].rating)
                star.push({
                    star: true,
                    starHalf: false
                });
            else if (j - +list[i].rating < 1)
                star.push({
                    star: false,
                    starHalf: true
                });
            else
                star.push({
                    star: false,
                    starHalf: false
                });
        }
        list[i].hasPromotion = false;
        if (list[i].promotion != 0)
            list[i].hasPromotion = true;
        list[i].star = star;
    }
    res.render('vwUser/courses', {
        course: list,
        fieldName,
        catName,
        empty: list.length === 0,
        pageNumbers,
        prevPage: +page - 1,
        nextPage: +page + 1,
        hasPrevPage: +page > 1,
        hasNextPage: +page < nPages
    });
});

router.get('/detail', async function (req, res) {
    res.locals.lcCatPage = true;

    const catID = req.query.catID;
    const courseID = req.query.id;
    const userID = res.locals.lcUserID;

    const isInMyCourse = await myCourseService.isInMyCourse(userID, courseID);
    if (isInMyCourse === true) {
        const lecture = await userLecturesService.getMaxDate(userID, courseID);
        return res.redirect(`/lectures/users/${lecture.lecID}`);
    }


    res.locals.curCourse = {
        catID,
        courseID
    };

    const course = await courseService.findById(courseID);
    const tempTeacher = await teachersService.findById(course.teacherID);
    if (tempTeacher !== null)
        course.instructor = tempTeacher.teacherName;
    const cat = await categoryService.findById(catID);
    const fieldID = cat.fieldID;
    const field = await fieldService.findById(fieldID);
    const catName = cat.catName;
    const lecture = await lectureService.findAllByCourseID(courseID);
    const recommendList = await courseService.find5BestSellerCoursesByCatID(courseID, catID);
    const isInWishList = await wishlistService.isInWishList(userID, courseID);

    for (let i = 0; i < lecture.length; i++) {
        lecture[i].newLectureID = _.kebabCase(lecture[i].lecName);
    }

    course.hasPromotion = false;
    if (course.promotion != 0) {
        course.hasPromotion = true;
    }

    const star = [];
    for (let j = 1; j <= 5; j++) {
        if (j <= +course.rating)
            star.push({
                star: true,
                starHalf: false
            });
        else if (j - +course.rating < 1)
            star.push({
                star: false,
                starHalf: true
            });
        else
            star.push({
                star: false,
                starHalf: false
            });
    }
    course.star = star;
    res.locals.lcTitle = course.courseName + " | " + res.locals.lcTitle;

    const feedbackList = await feedbackService.findByCourseIDWithLimit(courseID, 4);
    const totalFb = await feedbackService.countByCourseID(courseID);

    for (let i = 0; i < feedbackList.length; i++) {
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +feedbackList[i].rating)
                star.push(true);
            else
                star.push(false);
        }
        feedbackList[i].star = star;
        feedbackList[i].avatar = feedbackList[i].author[0];
    }

    res.render('vwUser/details', {
        empty: course.length === 0,
        course,
        fieldName: field.fieldName,
        catName,
        lecture,
        recommendItem: recommendList,
        feedback: feedbackList,
        emptyFbList: feedbackList.length === 0,
        isInWishList,
        totalFb
    })
});

router.post('/wishlist', async function (req, res) {
    const courseID = req.query.id;
    const userID = req.query.userID;

    const isInWishList = await wishlistService.isInWishList(userID, courseID);
    if (isInWishList === true) {
        await wishlistService.del(userID, courseID);
        res.json(false);
    } else {
        await wishlistService.add({
            userID,
            courseID
        });
        res.json(true);
    }
});

router.post('/buy-now', async function (req, res) {
    const courseID = await req.body.courseID;
    const userID = await req.body.userID;

    await myCourseService.add({
        userID,
        courseID
    });
    const lectureList = await lectureService.findAllByCourseID(courseID);
    console.log(lectureList);
    for (let i = 0; i < lectureList.length; i++) {
        await userLecturesService.add({
            userID,
            lecID: lectureList[i].lecID,
            completed: 0,
            date: null,
            courseID
        });
    }

    const isInWishList = await wishlistService.isInWishList(userID, courseID);
    if (isInWishList === true) {
        await wishlistService.del(userID, courseID);
    }
    res.redirect('back');
});

router.post('/moreFB', async function (req, res) {
    const courseID = req.query.id;
    var limit = 4;
    var offset = req.query.offset;

    var list = await feedbackService.findByCourseIDWithLimitOffset(courseID, limit, offset);
    for (let i = 0; i < list.length; i++) {
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +list[i].rating)
                star.push(true);
            else
                star.push(false);
        }
        list[i].star = star;
        list[i].avatar = list[i].author[0];
        const event = new Date(list[i].date);
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        };
        list[i].date = event.toLocaleDateString("en-US", options);
    }

    res.json(list);
})

export default router;