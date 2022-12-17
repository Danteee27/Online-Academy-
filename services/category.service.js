import db from '../utils/db.js';

export default {
    findAll() {
        return db('categories');
    },

    findAllByField(fieldID) {
        return db('categories').where('fieldID', fieldID);
    },

    async findCatIDByCatName(catName) {
        const list = await db('categories').where('catName', catName);
        return list[0].catID;
    },

    async findCatNameByCatID(catID) {
        const list = await db('categories').where('catID', catID);
        return list[0].catName;
    },

    async findFieldIDByCatID(catID) {
        const list = await db('categories').where('catID', catID);
        return list[0].fieldID;
    },

    addCatNameToCourse(list, catName) {
        let n = list.length;
        for (let i = 0; i < n; i++)
            list[i].catName = catName;
    }
};