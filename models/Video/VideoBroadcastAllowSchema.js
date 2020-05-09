// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const VideoBroadcastAllowSchema = function (VideoBroadcastAllow) {
    // // this.id = VideoBroadcastAllow.id;
    this.video_id = VideoBroadcastAllow.video_id;
};

VideoBroadcastAllowSchema.create = (newVideoBroadcastAllow, result) => {
    mysql.query("INSERT INTO video_broadcast_allows SET ?", newVideoBroadcastAllow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created video_broadcast_allows: ", { id: res.insertId, ...newVideoBroadcastAllow });
        result(null, { id: res.insertId, ...newVideoBroadcastAllow });
    });
};

VideoBroadcastAllowSchema.findById = (VideoBroadcastAllowId, result) => {
    mysql.query(`SELECT * FROM video_broadcast_allows WHERE id = ${VideoBroadcastAllowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found video_broadcast_allows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

VideoBroadcastAllowSchema.getAll = result => {
    mysql.query("SELECT * FROM video_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("video_broadcast_allows: ", res);
        result(null, res);
    });
};

// VideoBroadcastAllowSchema.updateById = (id, VideoBroadcastAllow, result) => {
//     mysql.query(
//         "UPDATE video_broadcast_allows SET video_id = ? WHERE id = ?",
//         [VideoBroadcastAllow.video_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found VideoBroadcastAllow with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated video_broadcast_allows: ", { id: id, ...VideoBroadcastAllow });
//             result(null, { id: id, ...VideoBroadcastAllow });
//         }
//     );
// };

VideoBroadcastAllowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM video_broadcast_allows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found VideoBroadcastAllowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted video_broadcast_allows with id: ", id);
        result(null, res);
    });
};

VideoBroadcastAllowSchema.removeAll = result => {
    mysql.query("DELETE FROM video_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} video_broadcast_allows`);
        result(null, res);
    });
};

module.exports = VideoBroadcastAllowSchema;

// module.exports = mongoose.model('Video', VideoBroadcastAllowSchema);