import db from '../utils/db.js';

export default {
    findAll() {
        return db('user-lectures');
    },
    async findByDetail(userID, lecID) {
        const list = await db('user-lectures').where('userID', userID).where('lecID', lecID);
        return list[0];
    },
    async getStatus(userID, lecID) {
        const list = await db('user-lectures').where('userID', userID).where('lecID', lecID);
        if (list[0].completed === 0)
            return false;
        else
            return true;
    },
    async setDate(userID, lecID) {
        var now = new Date();
        await db('user-lectures').where('userID', userID).where('lecID', lecID).update(
            'date', now
        )
    },
    add(entity) {
        return db('user-lectures').insert(entity);
    },
    del(userID, lecID) {
        return db('user-lectures').where('userID', userID).where('lecID', lecID).del();
    },
    update(userID, lecID, completed) {
        return db('user-lectures').where('userID', userID).where('lecID', lecID).update('completed', completed);
    }
};