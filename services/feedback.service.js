import db from '../utils/db.js';

export default {
    findAll() {
        return db('feedbacks');
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
        for (let i = 0; i < list.length; i++) {
            const event = new Date(list[i].date);
            const options = {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            };
            list[i].date = event.toLocaleDateString("en-US", options);
        }
        return list;
    }
};