import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('lectures');
    },

    findById(lecID) {
        return db('lectures').where('lectures', lecID).first();
    },
    findByCourseID(courseID) {
        return db('lectures').where('courseID', courseID);
    },
    async countByCourseID(courseID) {
        const list = db('courses').where('courseID', courseID).count({
            amount: 'lecID'
        });
        return list[0].amount;
    },
    add(lecture) {
        return db('lectures').insert(lecture);
    },
    update(lecID, lecture) {
        return db('lectures').where('lecID', lecID).update(lecture);
    },
    hide(lecID) {
        return db('lectures').where('lecID', lecID).update({
            hidden: 1
        });
    },
    unhide(lecID) {
        return db('lectures').where('lecID', lecID).update({
            hidden: 0
        })
    },
    del(lecID) {
        return db('lectures').where('lecID', lecID).del();
    },
    addVideoID(video, id) {
        return db('lectures').where('lecID', id).update({videoURL: video});
    },


}