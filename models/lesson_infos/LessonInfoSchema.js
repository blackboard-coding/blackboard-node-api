// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const mysql = require('mysql');
const mysql = require("../../db.config")




// Ad
const LessonInfoSchema = function (LessonInfo) {
    // // this.id = LessonInfo.id;
    // this.number = LessonInfo.number;
    this.title = LessonInfo.title;
    this.note = LessonInfo.note;
    this.type = LessonInfo.type;
    this.tag = LessonInfo.tag;
    this.cover = LessonInfo.cover;
    this.price = LessonInfo.price;
    this.net = LessonInfo.net;
    this.active = LessonInfo.active;
    this.duration = LessonInfo.duration;
    this.status = LessonInfo.status;
};

LessonInfoSchema.create = (newLessonInfo, result) => {
    mysql.query("INSERT INTO lesson_infos SET ?", newLessonInfo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created lesson_infos: ", { id: res.insertId, ...newLessonInfo });
        result(null, { id: res.insertId, ...newLessonInfo });
    });
};

LessonInfoSchema.findById = (LessonInfoId, result) => {
    mysql.query(`SELECT * FROM lesson_infos WHERE id = ${LessonInfoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found lesson_infos: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

LessonInfoSchema.findByNotAllowVideo = (result) => {
    mysql.query(`SELECT * FROM lesson_infos WHERE status = 0`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found lesson_infos: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

LessonInfoSchema.getAll = result => {
    mysql.query("SELECT * FROM lesson_infos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("lesson_infos: ", res);
        result(null, res);
    });
};

LessonInfoSchema.updateByAllowVideo = (id, LessonInfo, result) => {
    mysql.query(
        "UPDATE lesson_infos SET status = ? WHERE id = ?",
        [
            LessonInfo.status,
            id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found LessonInfo with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated lesson_infos: ", { id: id, ...LessonInfo });
            result(null, { id: id, ...LessonInfo });
        }
    );
};


LessonInfoSchema.updateById = (id, LessonInfo, result) => {
    mysql.query(
        "UPDATE lesson_infos SET title = ?,note = ?,type = ?,tag = ?,cover = ?,price = ?,net = ?,active = ?,duration = ?,status = ? WHERE id = ?",
        [
            LessonInfo.title,
            LessonInfo.note,
            LessonInfo.type,
            LessonInfo.tag,
            LessonInfo.cover,
            LessonInfo.price,
            LessonInfo.net,
            LessonInfo.active,
            LessonInfo.duration,
            LessonInfo.status,
            id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found LessonInfo with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated lesson_infos: ", { id: id, ...LessonInfo });
            result(null, { id: id, ...LessonInfo });
        }
    );
};

LessonInfoSchema.remove = (id, result) => {
    mysql.query("DELETE FROM lesson_infos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found LessonInfoSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted lesson_infos with id: ", id);
        result(null, res);
    });
};

LessonInfoSchema.removeAll = result => {
    mysql.query("DELETE FROM lesson_infos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} lesson_infos`);
        result(null, res);
    });
};

module.exports = LessonInfoSchema;

// module.exports = mongoose.model('Video', LessonInfoSchema);