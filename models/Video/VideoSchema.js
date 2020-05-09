// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const VideoSchema = function (Video) {
    // // this.id = Video.id;
    this.user_id = Video.user_id;
    this.shop_id = Video.shop_id;
    // // this.number = Video.number;
    this.on_buy = Video.on_buy;
    this.playlist = Video.playlist;
    this.type = Video.type;
    this.broadcast_type = Video.broadcast_type;
    this.price_type = Video.price_type;
    this.price = Video.price;
    this.title_image = Video.title_image;
    this.title = Video.title;
    this.favorite = Video.favorite;
    this.video = Video.video;
    this.detail = Video.detail;
    this.rating = Video.rating;
    this.net = Video.net;
    this.discount = Video.discount;
    this.view = Video.view;
    // // this.updated = Video.updated;
    this.comment = Video.comment;
    this.report = Video.report;
};

VideoSchema.create = (newVideo, result) => {
    mysql.query("INSERT INTO videos SET ?", newVideo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created videos: ", { id: res.insertId, ...newVideo });
        result(null, { id: res.insertId, ...newVideo });
    });
};

VideoSchema.findById = (VideoId, result) => {
    mysql.query(`SELECT * FROM videos WHERE id = ${VideoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found videos: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

VideoSchema.getAll = result => {
    mysql.query("SELECT * FROM videos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("videos: ", res);
        result(null, res);
    });
};

VideoSchema.updateById = (id, Video, result) => {
    mysql.query(
        "UPDATE videos SET playlist = ?, type = ?, title_image = ?, title = ?, video = ?, detail = ?, price_type = ?, price = ?, discount = ? WHERE id = ?",
        [
            // Video.user_id, 
            // Video.shop_id, 
            // Video.number, 
            // Video.on_buy, 
            Video.playlist,
            Video.type,
            // Video.broadcast_type,
            Video.title_image,
            Video.title,
            Video.video,
            Video.detail,
            // Video.rating, 
            // Video.net,  
            Video.price_type,
            Video.price,
            Video.discount,
            // Video.favorite, 
            // Video.view, 
            // Video.updated, 
            // Video.comment, 
            // Video.report, 
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Video with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated videos: ", { id: id, ...Video });
            result(null, { id: id, ...Video });
        }
    );
};

VideoSchema.remove = (id, result) => {
    mysql.query("DELETE FROM videos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found VideoSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted videos with id: ", id);
        result(null, res);
    });
};

VideoSchema.removeAll = result => {
    mysql.query("DELETE FROM videos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} videos`);
        result(null, res);
    });
};

module.exports = VideoSchema;

// module.exports = mongoose.model('Video', VideoSchema);