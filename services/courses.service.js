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

    async findByCategoryID(catID) {
        const list = db('courses').where('catID', catID);
        if (list.length === 0) {
            return null;
        }

        return list[0];
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
        return db('courses').where('CatID', catID).limit(limit).offset(offset);
    },

    async find5BestSellerCoursesByCatID(curCourseID, catID) {
        const list = await db('courses').where('catID', catID).whereNot('courseID', curCourseID).limit(5).orderBy('student_num', 'desc');
        return list;
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
    }



}