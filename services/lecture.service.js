import db from '../utils/db.js';

export default {
    findAll() {
        return db('lectures');
    },

    // findAllByCatID(courseID,lecID) {
    //     return db('lectures').where('courseID', courseID,'lecID',lecID);
    // },
    findAllByCourseID(couID)
    {
        return db('lectures').where('courseID',couID);
    },
    findByLectureID(lecID)
    {
        return db('lectures').where('lecID',lecID);
    },
    findCoureIDByLectureID(lecID)
    {
        return db('lectures').where('lecID',lecID).select('courseID');
    }
};