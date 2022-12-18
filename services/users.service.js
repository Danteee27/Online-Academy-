import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('users');
    },

    async findById(id) {
        const list = await db('users').where('userID', id);
        if (list.length === 0)
            return null;

        return list[0];
    },

    async findByCategoryID(catID)
    {
        return await db('courses').where('catID',catID);
    },
    async teacherCourses(teacherId) {
        return await db('courses').where('teacherNumber', teacherId);
    },
    addCourse(newCourse) {
        return db('categories').insert(newCourse);
    },

}