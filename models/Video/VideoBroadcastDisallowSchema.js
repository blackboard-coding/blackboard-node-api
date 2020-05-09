// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const VideoBroadcastDisallowSchema = function (VideoBroadcastDisallow) {
    // // this.id = Video.id;
    this.video_id = VideoBroadcastDisallow.video_id;
    this.message = VideoBroadcastDisallow.message;
};

VideoBroadcastDisallowSchema.create = (newVideoBroadcastDisallow, result) => {
    mysql.query("INSERT INTO video_broadcast_disallows SET ?", newVideoBroadcastDisallow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created video_broadcast_disallows: ", { id: res.insertId, ...newVideoBroadcastDisallow });
        result(null, { id: res.insertId, ...newVideoBroadcastDisallow });
    });
};

VideoBroadcastDisallowSchema.findById = (VideoBroadcastDisallowId, result) => {
    mysql.query(`SELECT * FROM video_broadcast_disallows WHERE id = ${VideoBroadcastDisallowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found video_broadcast_disallows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

VideoBroadcastDisallowSchema.getAll = result => {
    mysql.query("SELECT * FROM video_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("video_broadcast_disallows: ", res);
        result(null, res);
    });
};

VideoBroadcastDisallowSchema.updateById = (id, VideoBroadcastDisallow, result) => {
    mysql.query(
        "UPDATE video_broadcast_disallows SET message = ? WHERE id = ?",
        [VideoBroadcastDisallow.message, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found VideoBroadcastDisallow with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated video_broadcast_disallows: ", { id: id, ...VideoBroadcastDisallow });
            result(null, { id: id, ...VideoBroadcastDisallow });
        }
    );
};

VideoBroadcastDisallowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM video_broadcast_disallows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found VideoBroadcastDisallowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted video_broadcast_disallows with id: ", id);
        result(null, res);
    });
};

VideoBroadcastDisallowSchema.removeAll = result => {
    mysql.query("DELETE FROM video_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} video_broadcast_disallows`);
        result(null, res);
    });
};

module.exports = VideoBroadcastDisallowSchema;

// module.exports = mongoose.model('Video', VideoBroadcastDisallowSchema);