import db from '../utils/db.js';

export default {
    findAll() {
        return db('feedbacks');
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
        if (list.length === 0)
            return null;
        return list;
    },

    findByCourseIDWithLimit(courseID, limit) {
        return db('feedbacks').where('courseID', courseID).limit(limit);
    },

    findByCourseIDWithLimitOffset(courseID, limit, offset) {
        return db('feedbacks').where('courseID', courseID).limit(limit).offset(offset);
    },

    async countByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID).count({
            amount: 'fbID'
        });
        return list[0].amount;
    },

    async isCommented(userID, courseID) {
        const list = await db('feedbacks').where('userID', userID).where('courseID', courseID);
        if (list.length === 0)
            return false;
        return true;
    },

    add(entity) {
        return db('feedbacks').insert(entity);
    },
    del(userID, courseID) {
        return db('feedbacks').where('userID', userID).where('courseID', courseID).del();
    }
};