import db from '../utils/db.js';
import coursesService from './courses.service.js';

export default {
    async findAll() {
        return await db('categories');
    },

    async findAllWithoutHidden() {
        return await db('categories').where('hidden', 0);
    },

    async findById(catID) {
        const list = await db('categories').where('catID', catID);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByIdWithoutHidden(catID) {
        const list = await db('categories').where('catID', catID).where('hidden', 0);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID);
        if (list.length === 0) {
            return null;
        }

        return list;
    },

    async findAllByFieldIDWithoutHidden(fieldID) {
        const list = await db('categories').where('fieldID', fieldID).where('hidden', 0);
        if (list.length === 0) {
            return null;
        }

        return list;
    },

    async findAllByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID);
        if (list.length === 0) {
            return null;
        }

        return list;
    },

    async countByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID).count({
            amount: 'catID'
        });

        return list[0].amount;
    },

    async find5MostEnrolledCategories() {
        const list = await db('categories').where('hidden', 0);
        if (list.length === 0)
            return null;
        for (const c of list) {
            c.totalStudent = 0;
            let courseList = await coursesService.findByCategoryIDWithoutHidden(c.catID);
            if (courseList === null)
                continue;
            for (const x of courseList) {
                c.totalStudent += (+x.weekStudentNum + +x.lwStudentNum);
            }
        }
        list.sort((a, b) => b.totalStudent - a.totalStudent);
        return list.slice(0, 5);
    },

    add(category) {
        console.log(category);
        return db('categories').insert(category);
    },
    update(catID, newCategory) {
        return db('categories').where('catID', catID).update(newCategory);
    },
    hide(catID) {
        return db('categories').where('catID', catID).update({
            hidden: 1
        });
    },
    unhide(catID) {
        return db('categories').where('catID', catID).update({
            hidden: 0
        });
    },
    del(catID) {
        return db('categories').where('catID', catID).del();
    },

    addCatNameToCourse(list, catName) {
        let n = list.length;
        for (let i = 0; i < n; i++)
            list[i].catName = catName;
    }

}