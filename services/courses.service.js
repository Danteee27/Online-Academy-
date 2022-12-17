import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('courses');
    },

    findById(courseID) {
        return db('courses').where('courseID', courseID).first();
    },

    findByCategoryID(catID)
    {
        return db('courses').where('catID', catID);
    },

    async countByCategoryID(catID)
    {
        const list = db('courses').where('catID', catID).count({amount: 'courseID'});
        console.log(list);
        return list[0].amount;
    },

    add(course)
    {
        return db('courses').insert(course);
    },

    update(courseID, course)
    {
        return db('courses').where('courseID',courseID).update(course);
    }
    ,
    hide(courseID)
    {
        return db('courses').where('courseID',courseID).update({hidden: 1});
    },
    unhide(courseID)
    {
        return db('courses').where('courseID',courseID).update({hidden: 0});
    }
    ,
    del(courseID)
    {
        return db('courses').where('courseID',courseID).del();
    }

}