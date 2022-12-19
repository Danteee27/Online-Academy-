import db from '../utils/db.js';

export default {
    findAll() {
        return db('feedbacks');
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
        return list;
    },

    async findByCourseIDWithLimit(courseID, limit) {
        const list = await db('feedbacks').where('courseID', courseID).limit(limit);
        return list;
    },

    async countByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID).count({
            amount: 'fbID'
        })
        return list[0].amount;
    }
};