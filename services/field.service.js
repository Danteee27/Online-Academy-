import db from '../utils/db.js';

export default {
    findAll() {
        return db('fields');
    },

    async findFieldNameByFieldID(fieldID) {
        const list = await db('fields').where('fieldID', fieldID);
        return list[0].fieldName;
    }
};