// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const VideoBroadcastWaitingSchema = function (VideoBroadcastWaiting) {
    // // this.id = VideoBroadcastWaiting.id;
    this.video_id = VideoBroadcastWaiting.video_id;
};

VideoBroadcastWaitingSchema.create = (newVideoBroadcastWaiting, result) => {
    mysql.query("INSERT INTO video_broadcast_waitings SET ?", newVideoBroadcastWaiting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created video_broadcast_waitings: ", { id: res.insertId, ...newVideoBroadcastWaiting });
        result(null, { id: res.insertId, ...newVideoBroadcastWaiting });
    });
};

VideoBroadcastWaitingSchema.findById = (VideoBroadcastWaitingId, result) => {
    mysql.query(`SELECT * FROM video_broadcast_waitings WHERE id = ${VideoBroadcastWaitingId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found video_broadcast_waitings: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

VideoBroadcastWaitingSchema.getAll = result => {
    mysql.query("SELECT * FROM video_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("video_broadcast_waitings: ", res);
        result(null, res);
    });
};

// VideoBroadcastWaitingSchema.updateById = (id, VideoBroadcastWaiting, result) => {
//     mysql.query(
//         "UPDATE video_broadcast_waitings SET video_id = ? WHERE id = ?",
//         [VideoBroadcastWaiting.video_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found VideoBroadcastWaiting with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated video_broadcast_waitings: ", { id: id, ...VideoBroadcastWaiting });
//             result(null, { id: id, ...VideoBroadcastWaiting });
//         }
//     );
// };

VideoBroadcastWaitingSchema.remove = (id, result) => {
    mysql.query("DELETE FROM video_broadcast_waitings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found VideoBroadcastWaitingSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted video_broadcast_waitings with id: ", id);
        result(null, res);
    });
};

VideoBroadcastWaitingSchema.removeAll = result => {
    mysql.query("DELETE FROM video_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} video_broadcast_waitings`);
        result(null, res);
    });
};

module.exports = VideoBroadcastWaitingSchema;

// module.exports = mongoose.model('Video', VideoBroadcastWaitingSchema);