import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('courses');
    },

    async findById(courseID) {
        const list = db('courses').where('courseID', courseID);
        if(list.length === 0) {
            return null;
        }

        return list[0];
    },

    findByCategoryID(catID) {
        return db('courses').where('catID', catID);
    async findByCategoryID(catID)
    {
        const list = db('courses').where('catID', catID);
        if(list.length === 0) {
            return null;
        }

        return list[0];
    },

    async countByCategoryID(catID) {
        const list = db('courses').where('catID', catID).count({
            amount: 'courseID'
        });
        return list[0].amount;
    },

    findPageByCatID(catID, limit, offset) {
        return db('courses').where('CatID', catID).limit(limit).offset(offset);
    },

    add(course) {

        return db('courses').insert(course);
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
