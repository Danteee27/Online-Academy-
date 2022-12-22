import express from 'express';
import courseService from '../services/courses.service.js';
import teachersService from '../services/teachers.service.js';
import wishlistService from '../services/wishlists.service.js';

const router = express.Router();

router.get("/", async function (req, res) {
    res.locals.lcWishlistPage = true;
    res.locals.lcTitle = "Wishlist | " + res.locals.lcTitle;
    const userID = res.locals.authUser.userID;

    const total = await wishlistService.countByUserID(userID);
    const limit = 8;
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
    const wishlist = await wishlistService.findByUserID(userID, limit, offset);

    let course = [];
    for (let i = 0; i < wishlist.length; i++) {
        let temp = await courseService.findById(wishlist[i].courseID);
        let tempTeacher = await teachersService.findById(temp.teacherID);
        if (tempTeacher !== null)
            temp.instructor = tempTeacher.teacherName;
        course.push(temp);
    }
    for (let i = 0; i < course.length; i++) {
        const star = [];
        for (let j = 1; j <= 5; j++) {
            if (j <= +course[i].rating)
                star.push({
                    star: true,
                    starHalf: false
                });
            else if (j - +course[i].rating < 1)
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
        course[i].star = star;
    }

    res.render('vwUser/wishlists', {
        course,
        pageNumbers,
        empty: wishlist.length === 0,
        prevPage: +page - 1,
        nextPage: +page + 1,
        hasPrevPage: +page > 1,
        hasNextPage: +page < nPages
    });
});

export default router;