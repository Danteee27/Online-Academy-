import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('courses');
    },

    findById(courseID) {
        return db('courses').where('courseID', courseID).first();
    },
    //Phan Huy - For show courses of teacher by role and id teacher number is teacher id
    async findByUserId(userID) {
        return await db('courses').where('teacherNumber', userID);
    },
    async findByCategoryID(catID)
    {
        return db('courses').where('catID', catID);
    },

    async countByCategoryID(catID)
    {
        const list = db('courses').where('catID', catID).count({amount: 'courseID'});
        console.log(list);
        return list[0].amount;
    },
    addImage(image, id) {
        return db('courses').where('courseID', id).update({image: image});
    },

    add(course)
    {
        return db('courses').insert(course);
    },

    addLecture(lecture)
    {
        return db('lectures').insert(lecture);
    },

    async findMaxId() {
        const sql = `SELECT \`AUTO_INCREMENT\`
                     FROM INFORMATION_SCHEMA.TABLES
                     WHERE TABLE_SCHEMA = 'qlkh'
                       AND TABLE_NAME = 'courses'`;
        const ret = await db.raw(sql);
        return ret[0];
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