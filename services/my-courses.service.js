import db from "../utils/db.js";

export default {
  findAll() {
    return db("my-courses");
  },

  findAllByCourseID(courseID) {
    return db("my-courses").where("courseID", courseID);
  },

  findAllUserIDByCourseID(courseID) {
    return db("my-courses")
      .select("userID")
      .where("courseID", courseID)
      .distinct();
  },

  async isInMyCourse(userID, courseID) {
    const list = await db("my-courses")
      .where("userID", userID)
      .where("courseID", courseID);
    if (list.length === 0) return false;
    return true;
  },

  async countByUserID(userID) {
    const list = await db("my-courses").where("userID", userID).count({
      amount: "courseID",
    });
    return list[0].amount;
  },

  findByUserID(userID, limit, offset) {
    return db("my-courses").where("userID", userID).limit(limit).offset(offset);
  },

  add(userID, courseID) {
    return db("my-courses").insert(userID, courseID);
  },

  del(userID, courseID) {
    return db("my-courses")
      .where("userID", userID)
      .where("courseID", courseID)
      .del();
  },
};
