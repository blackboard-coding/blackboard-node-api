// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const mysql = require('mysql');
const mysql = require("../../db.config")




// Ad
const AdSchema = function (Ad) {
    // // this.id = Ad.id;
    // this.number = Ad.number;
    this.title = Ad.title;
    this.news_text = Ad.news_text;
    this.bg_image = Ad.bg_image;
    this.detail = Ad.detail;
    this.url = Ad.url;
};

AdSchema.create = (newAd, result) => {
    mysql.query("INSERT INTO ads SET ?", newAd, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ads: ", { id: res.insertId, ...newAd });
        result(null, { id: res.insertId, ...newAd });
    });
};

AdSchema.findById = (AdId, result) => {
    mysql.query(`SELECT * FROM ads WHERE id = ${AdId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found ads: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

AdSchema.getAll = result => {
    mysql.query("SELECT * FROM ads", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ads: ", res);
        result(null, res);
    });
};

AdSchema.updateById = (id, Ad, result) => {
    mysql.query(
        "UPDATE ads SET title = ?,news_text = ?,bg_image = ?,detail = ?,url = ? WHERE id = ?",
        [
            Ad.title,
            Ad.news_text,
            Ad.bg_image,
            Ad.detail,
            Ad.url,
            id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Ad with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated ads: ", { id: id, ...Ad });
            result(null, { id: id, ...Ad });
        }
    );
};

AdSchema.remove = (id, result) => {
    mysql.query("DELETE FROM ads WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AdSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ads with id: ", id);
        result(null, res);
    });
};

AdSchema.removeAll = result => {
    mysql.query("DELETE FROM ads", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ads`);
        result(null, res);
    });
};

module.exports = AdSchema;

// module.exports = mongoose.model('Video', AdSchema);