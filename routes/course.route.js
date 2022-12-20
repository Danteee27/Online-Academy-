import express from 'express';
import _ from 'lodash';
import courseService from '../services/course.service.js';
import categoryService from '../services/category.service.js';
import fieldService from '../services/field.service.js';
import lectureService from '../services/lecture.service.js';
import feedbackService from '../services/feedback.service.js';
import wishlistService from '../services/wishlist.service.js';
import myCourseService from '../services/my-course.service.js';

const router = express.Router();

router.get("/", function (req, res) {
    res.locals.lcCatPage = true;
    res.render('vwUser/courses');
});

router.get('/category/:id', async function (req, res) {
    const catID = req.params.id;

    res.locals.lcCatPage = true;

    const catName = await categoryService.findCatNameByCatID(catID);
    const fieldID = await categoryService.findFieldIDByCatID(catID);
    const fieldName = await fieldService.findFieldNameByFieldID(fieldID);

    res.locals.lcTitle = catName + " | " + res.locals.lcTitle;

    const limit = 8;
    const total = await courseService.countByCatId(catID);
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
    // console.log(list);
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
        return res.redirect(`/lecture/${courseID}`);
    }


    res.locals.curCourse = {
        catID,
        courseID
    };

    const course = await courseService.findByDetail(catID, courseID);
    const fieldID = await categoryService.findFieldIDByCatID(catID);
    const fieldName = await fieldService.findFieldNameByFieldID(fieldID);
    const catName = await categoryService.findCatNameByCatID(catID);
    const lecture = await lectureService.findAllByCourseID(courseID);
    const recommendList = await courseService.find5BestSellerCoursesByCatID(courseID, catID);
    const isInWishList = await wishlistService.isInWishList(1, courseID);

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

    res.render('vwUser/detail', {
        empty: course.length === 0,
        course,
        fieldName,
        catName,
        lecture,
        recommendItem: recommendList,
        feedback: feedbackList,
        isInWishList
    })
});

router.post('/detail', async function (req, res) {
    const courseID = await req.body.id;
    const userID = await req.body.userID;
    // const prevPage = await req.body.prevPage;

    const isInWishList = await wishlistService.isInWishList(userID, courseID);
    if (isInWishList === true) {
        await wishlistService.del(userID, courseID);
    } else {
        await wishlistService.add({
            userID,
            courseID
        });
    }
    // const curPage = req.headers.referer;
    // req.headers.referer = prevPage;
    // res.redirect(curPage);
    res.redirect('back');
});

router.post('/buy-now', async function (req, res) {
    const courseID = await req.body.id;
    const userID = await req.body.userID;

    await myCourseService.add({
        userID,
        courseID
    });

    const isInWishList = await wishlistService.isInWishList(userID, courseID);
    if (isInWishList === true) {
        await wishlistService.del(userID, courseID);
    }
    res.redirect('back');
});

router.post('/moreFB', async function (req, res) {
    var limit = 4;
    var offset = parseInt(await req.fields.offset);
    console.log(offset);

    var list = await feedbackService.findByCourseIDWithLimitOffset(2, limit, offset);
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