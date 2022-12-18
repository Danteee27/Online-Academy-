import db from '../utils/db.js';

export default {
    findAll() {
        return db('courses');
    },

    findAllByCatID(catID) {
        return db('courses').where('catID', catID);
    },

    findPageByCatID(catID, limit, offset) {
        return db('courses').where('CatID', catID).limit(limit).offset(offset);
    },

    async countByCatId(catId) {
        const list = await db('courses').where('CatID', catId).count({
            amount: 'courseID'
        });
        return list[0].amount;
    },

    async findByDetail(catID, id) {
        const list = await db('courses').where('catID', catID).where('courseID', id);
        const event = new Date(list[0].update);
        const options = {
            month: 'numeric',
            year: 'numeric'
        };
        list[0].update = event.toLocaleDateString("en-US", options);
        return list[0];
    },

    async find5BestSellerCoursesByCatID(curCourseID, catID) {
        const list = await db('courses').where('catID', catID).whereNot('courseID', curCourseID).limit(5).orderBy('student_num', 'desc');
        return list;
    }
};