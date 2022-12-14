import db from "../utils/db.js";

export default {
  findAll() {
    return db("user-lectures");
  },
  async findByDetail(userID, lecID) {
    const list = await db("user-lectures")
      .where("userID", userID)
      .where("lecID", lecID);
    return list[0];
  },
  async findAllByCourseID(userID, courseID) {
    const list = await db("user-lectures")
      .where("userID", userID)
      .where("courseID", courseID);
    return list;
  },
  async getStatus(userID, lecID) {
    const list = await db("user-lectures")
      .where("userID", userID)
      .where("lecID", lecID);
    if (list[0].completed === 0) return false;
    else return true;
  },
  async setDate(userID, lecID) {
    var now = new Date();
    await db("user-lectures")
      .where("userID", userID)
      .where("lecID", lecID)
      .update("date", now);
  },
  async getMaxDate(userID, courseID) {
    const list = await db("user-lectures")
      .where("userID", userID)
      .where("courseID", courseID)
      .orderBy("date", "desc");
    if (list.length === 0) return null;
    return list[0];
  },
  add(entity) {
    return db("user-lectures").insert(entity);
  },
  del(userID, lecID) {
    return db("user-lectures")
      .where("userID", userID)
      .where("lecID", lecID)
      .del();
  },
  update(userID, lecID, completed) {
    return db("user-lectures")
      .where("userID", userID)
      .where("lecID", lecID)
      .update("completed", completed);
  },
};
