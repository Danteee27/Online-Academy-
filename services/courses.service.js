import knex from 'knex';
import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('courses');
    },

    async findById(courseID) {
        const list = await db('courses').where('courseID', courseID);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByIdWithoutHidden(courseID) {
        const list = await db('courses').where('courseID', courseID).where('hidden', 0);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByCategoryID(catID) {
        const list = db('courses').where('catID', catID);
        if (list.length === 0) {
            return null;
        }

        return list;
    },
    async findByCategoryIDWithoutHidden(catID) {
        const list = db('courses').where('catID', catID).where('hidden', 0);
        if (list.length === 0) {
            return null;
        }

        return list;
    },

    async findByUserId(userID) {
        return db('courses').whereRaw('hidden = ?', [0]).where('teacherID', userID);
    },

    async countByCategoryID(catID) {
        const list = await db('courses').where('catID', catID).count({
            amount: 'courseID'
        });
        return list[0].amount;
    },
    addImage(image, id) {
        return db('courses').where('courseID', id).update({
            image: image
        });
    },

    findPageByCatID(catID, limit, offset) {
        return db('courses').where('CatID', catID).whereNot('hidden', 1).limit(limit).offset(offset);
    },

    async find5BestSellerCoursesByCatID(curCourseID, catID) {
        const list = await db('courses').where('catID', catID).whereNot('courseID', curCourseID).where('hidden', 0).limit(5).orderBy('student_num', 'desc');
        return list;
    },

    async find5BestSellerCourses(curCourseID) {
        const list = await db('courses').where('courseID', curCourseID).where('hidden', 0).limit(5).orderBy('student_num', 'desc');
        return list;
    },

    async findTopLastestCourse(topN) {
        const list = await db('courses').where('hidden', 0).orderBy('update', 'desc').limit(topN);
        return list;
    },
    async findTopNumberStudentCourse(topN) {
        const list = await db('courses').where('hidden', 0).orderBy('student_num', 'desc').limit(topN);
        return list;
    },

    async updateStudentNum(courseID) {
        const list = await db('courses').where('courseID', courseID);
        const student_num = list[0].student_num + 1;
        return await db('courses').where('courseID', courseID).update('student_num', student_num);
    },

    updateRatingNum(courseID, rating_num) {
        return db('courses').where('courseID', courseID).update('rating_num', rating_num);
    },

    updateRating(courseID, rating) {
        return db('courses').where('courseID', courseID).update('rating', rating);

    },

    async updateDate(courseID, today) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        return db('courses').where('courseID', courseID).update({
            update: today
        });
    },

    async checkCompleted(id) {
        const list = await db('lectures').where('courseID', id);
        if (list.length === await db('courses').where('courseID', id).select('lec_num')) {
            return await db('courses').where('courseID', id).update({
                completed: 1
            });
        }
        return;
    },

    add(course) {

        return db('courses').insert(course);
    },

    addLecture(lecture) {
        return db('lectures').insert(lecture);
    },

    async findMaxId() {
        const sql = `SELECT \`AUTO_INCREMENT\`
                     FROM INFORMATION_SCHEMA.TABLES
                     WHERE TABLE_SCHEMA = 'qlkh'
                       AND TABLE_NAME = 'courses'`;
        const ret = await db.raw(sql);
        return ret[0];
    },

    update(courseID, course) {
        return db('courses').where('courseID', courseID).update(course);
    },
    hide(courseID) {
        return db('courses').where('courseID', courseID).update({
            hidden: 1
        });
    },

    unhide(courseID) {
        return db('courses').where('courseID', courseID).update({
            hidden: 0
        });
    },
    del(courseID) {
        return db('courses').where('courseID', courseID).del();
    },
    updateView(numberView, id) {
        return db('courses').where('courseID', id).update({
            views: numberView
        });
    },
    async getAllDescending(limit) {
        return await db('courses').orderBy('views', 'desc').limit(limit);
    },
    async getAllAscending(limit) {
        return await db('courses').orderBy('views', 'asc').limit(limit);
    },

    async getNewestCourses(limit) {
        return await db('courses').orderBy('date', 'desc').limit(limit);
    },

    // FULL-TEXT SEARCH
    async fulltextSearch(searchStr, limit, offset, catID) {
        var sql = "select * from courses where match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) limit " + limit + " offset " + offset;
        if (catID != 0) {
            sql = "select * from courses where catID = " + catID + " and match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) limit " + limit + " offset " + offset;
        }
        const list = await db.raw(sql);
        if (list[0].length === 0)
            return null;
        return list[0];
    },

    async fulltextSearchHighestRated(searchStr, limit, offset, catID) {
        var sql = "select * from courses where match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by rating desc limit " + limit + " offset " + offset;
        if (catID != 0) {
            sql = "select * from courses where catID = " + catID + " and match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by rating desc limit " + limit + " offset " + offset;
        }
        const list = await db.raw(sql);
        if (list[0].length === 0)
            return null;
        return list[0];
    },

    async fulltextSearchNewest(searchStr, limit, offset, catID) {
        var sql = "select * from courses where match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by courses.update desc limit " + limit + " offset " + offset;
        if (catID != 0) {
            sql = "select * from courses where catID = " + catID + " and match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by courses.update desc limit " + limit + " offset " + offset;
        }
        const list = await db.raw(sql);
        if (list[0].length === 0)
            return null;
        return list[0];
    },

    async fulltextSearchPrice(searchStr, limit, offset, type, catID) {
        var sql = "select * from courses where match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by price " + type + " limit " + limit + " offset " + offset;
        if (catID != 0) {
            sql = "select * from courses where catID = " + catID + " and match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE) order by price " + type + " limit " + limit + " offset " + offset;
        }
        const list = await db.raw(sql);
        if (list[0].length === 0)
            return null;
        return list[0];
    },


    async fulltextSearchResCount(searchStr) {
        const sql = "select * from courses where match(courseName, tinydes) against ('" + searchStr + "' IN NATURAL LANGUAGE MODE)";
        const list = await db.raw(sql);
        return list[0].length;
    }


}