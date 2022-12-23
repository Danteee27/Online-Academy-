import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('users');
    },

    async findById(id) {
        const list = await db('users').where('userID', id);
        if (list.length === 0)
            return null;

        return list[0];
    },
    async findByEmail(email) {
        const list = await db('users').where('email', email);
        console.log(list.length);
        if (list.length === 0)
            return null;
        return list[0];
    },

    async findByCategoryID(catID) {
        return await db('courses').where('catID', catID);
    },
    async teacherCourses(teacherId) {
        return await db('courses').where('teacherNumber', teacherId);
    },
    async add(entity) {
        return await db('users').insert(entity);
    },

    update(userID, user) {

        return db('users').where('userID', userID).update(user);
    },
    ban(userID) {

        return db('users').where('userID', userID).update({
            banned: 1
        });
    },
    unban(userID) {
        return db('users').where('userID', userID).update({
            banned: 0
        });

    },
    del(userID) {
        return db('users').where('userID', userID).del();
    }
}