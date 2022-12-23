


import coursesRoute from "../routes/courses.route.js";
import fieldsRoute from "../routes/fields.route.js";
import categoriesRoute from "../routes/categories.route.js";
import lecturesRoute from "../routes/lectures.route.js";
import wishlistsRoute from "../routes/wishlists.route.js";
import myCoursesRoute from "../routes/my-courses.route.js";
import userCoursesRoute from "../routes/user-courses.route.js";
import usersRoute from "../routes/users.route.js"
import usersAdminRoute from "../routes/admin-user.route.js"

import teachersRoute from "../routes/teachers.route.js";
import {errorFunc} from "express-fileupload/lib/utilities.js";
import coursesService from "../services/courses.service.js";
// import {login} from "passport/lib/http/request.js";


export default function (app) {
    app.get('/', async function (req, res) {
        res.locals.lcHomePage = true;
        const listDescendingCourses = await coursesService.getAllDescending(10);
        function splitArrayToListSubArray(array,n)
        {
            const chunkSize = n;
            let list = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                list.push( array.slice(i, i + chunkSize));
                // do whatever
            }
            if((array.length % n) !== 0)
            {
                list[list.length-1].push(...array.slice(0,array.length % n))
            }
            return list;
        }
        const listSubDescCourses = splitArrayToListSubArray(listDescendingCourses,4);

        const listMostEnrolledCourses = await categoriesService.find5MostEnrolledCourses();
        const listSubMostEnrolledCourses = splitArrayToListSubArray(listMostEnrolledCourses,4);
        console.log(listSubMostEnrolledCourses);

        res.render('home',{
            listDescendingCourses,
            listSubDescCourses,
            listSubMostEnrolledCourses,
            layout:'main1'
        });
    });

    app.get('/err', function (req, res) {
        throw new Error('Error!!!');
    });

    app.get('/admin', function (req, res) {

        if(req.session.authUser != null) {
            if(req.session.authUser.role !== 'ROLE.ADMIN')
            {
                res.redirect('/');
            }
        }


        res.render('vwAdmin/index')
    });


    app.use('/admin/courses', coursesRoute);
    app.use('/admin/fields', fieldsRoute);
    app.use('/admin/categories', categoriesRoute);
    app.use('/wishlists', wishlistsRoute);
    app.use('/my-courses', myCoursesRoute);
    app.use('/user-courses', userCoursesRoute);
    app.use('/users', usersRoute);
    app.use('/admin/users', usersAdminRoute);
    app.use('/teacher', teachersRoute);
    app.use('/lectures', lecturesRoute);
}
