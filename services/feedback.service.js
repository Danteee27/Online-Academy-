import db from '../utils/db.js';

export default {
    findAll() {
        return db('feedbacks');
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
        return list;
    }
};