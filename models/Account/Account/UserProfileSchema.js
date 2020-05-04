// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');



// const UserProfileSchema = new Schema({
//     user: Object,
//     favorite: Number,
//     follow: Number,
//     language: String
// })

// constructor
const UserProfileSchema = function (UserProfile) {
    this.user = UserProfile.user;
    this.favorite = UserProfile.favorite;
    this.follow = UserProfile.follow;
    this.language = UserProfile.language;
};

UserProfileSchema.create = (newUserProfile, result) => {
    mysql.query("INSERT INTO user_profiles SET ?", newUserProfile, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created UserProfileSchema: ", { id: res.insertId, ...newUserProfile });
        result(null, { id: res.insertId, ...newUserProfile });
    });
};

UserProfileSchema.findById = (UserProfileId, result) => {
    mysql.query(`SELECT * FROM user_profiles WHERE id = ${UserProfileId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user_profiles: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found UserProfile with the id
        result({ kind: "not_found" }, null);
    });
};

UserProfileSchema.getAll = result => {
    mysql.query("SELECT * FROM user_profiles", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user_profiles: ", res);
        result(null, res);
    });
};

UserProfileSchema.updateById = (id, UserProfile, result) => {
    mysql.query(
        "UPDATE user_profiles SET email = ?, name = ?, active = ? WHERE id = ?",
        [UserProfile.email, UserProfile.name, UserProfile.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found UserProfile with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user_profiles: ", { id: id, ...UserProfile });
            result(null, { id: id, ...UserProfile });
        }
    );
};

UserProfileSchema.remove = (id, result) => {
    mysql.query("DELETE FROM user_profiles WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found UserProfileSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user_profiles with id: ", id);
        result(null, res);
    });
};

UserProfileSchema.removeAll = result => {
    mysql.query("DELETE FROM user_profiles", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user_profiles`);
        result(null, res);
    });
};

module.exports = UserProfileSchema;

// module.exports = mongoose.model('UserProfile', UserProfileSchema);