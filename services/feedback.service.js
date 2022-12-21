import db from '../utils/db.js';

export default {
    findAll() {
        const list = db('feedbacks');
        if(list.length === 0 )
            return null;
        return list[0];
    },

    async findByCourseID(courseID) {
        const list = await db('feedbacks').where('courseID', courseID);
        return list;
    },
    /**
     * rate is int
     * @param rating
     * @return a list feedbacks have the same rating
     */
    async findAllByRating(rating)
    {
        const list = await db('feedbacks').where('rating', rate);
        if(list.length === 0 )
            return null;
        return list[0];
    }
};