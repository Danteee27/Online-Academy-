import db from '../utils/db.js';

export default {
    findAll() {
        return db('feedbacks');
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
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
    }
};