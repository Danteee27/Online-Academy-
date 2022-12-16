import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('courses');
    },

    async findById(courseID) {
        return await db('courses').where('courseID', courseID).first();
    },

    async findByCategoryID(catID)
    {
        return await db('courses').where('catID',catID);
    }

}