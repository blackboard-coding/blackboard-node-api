// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// Playlist
const PlaylistSchema = function (Playlist) {
    // // this.id = Playlist.id;
    this.video_id = Playlist.video_id;
    this.user_id = Playlist.user_id;
    this.shop_id = Playlist.shop_id;
    this.name = Playlist.name;
    this.image = Playlist.image;
    this.view = Playlist.view;
    this.favorite = Playlist.favorite;
};

PlaylistSchema.create = (newPlaylist, result) => {
    mysql.query("INSERT INTO playlists SET ?", newPlaylist, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created playlists: ", { id: res.insertId, ...newPlaylist });
        result(null, { id: res.insertId, ...newPlaylist });
    });
};

PlaylistSchema.findById = (PlaylistId, result) => {
    mysql.query(`SELECT * FROM playlists WHERE id = ${PlaylistId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found playlists: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

PlaylistSchema.getAll = result => {
    mysql.query("SELECT * FROM playlists", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("playlists: ", res);
        result(null, res);
    });
};

PlaylistSchema.updateById = (id, Playlist, result) => {
    mysql.query(
        "UPDATE playlists SET name = ?,img = ? WHERE id = ?",
        [Playlist.name, Playlist.img, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Playlist with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated playlists: ", { id: id, ...Playlist });
            result(null, { id: id, ...Playlist });
        }
    );
};

PlaylistSchema.remove = (id, result) => {
    mysql.query("DELETE FROM playlists WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PlaylistSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted playlists with id: ", id);
        result(null, res);
    });
};

PlaylistSchema.removeAll = result => {
    mysql.query("DELETE FROM playlists", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} playlists`);
        result(null, res);
    });
};

module.exports = PlaylistSchema;

// module.exports = mongoose.model('Video', PlaylistSchema);