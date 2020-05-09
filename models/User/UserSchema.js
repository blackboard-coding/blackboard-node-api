// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const UserSchema = function (User) {
    // // this.id = User.id;
    this.last_name = User.last_name;
    this.frist_name = User.frist_name;
    this.image = User.image;
    this.email = User.email;
    this.number_phone = User.number_phone;
    this.password = User.password;
};

UserSchema.create = (newUser, result) => {
    mysql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created users: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

UserSchema.findById = (UserId, result) => {
    mysql.query(`SELECT * FROM users WHERE id = ${UserId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found users: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

UserSchema.getAll = result => {
    mysql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

UserSchema.updateById = (id, User, result) => {
    mysql.query(
        "UPDATE users SET last_name = ?,frist_name = ?, image = ?, email = ?, number_phone = ? WHERE id = ?",
        [User.last_name, User.frist_name, User.image, User.email, User.number_phone, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated users: ", { id: id, ...User });
            result(null, { id: id, ...User });
        }
    );
};

UserSchema.remove = (id, result) => {
    mysql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found UserSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted users with id: ", id);
        result(null, res);
    });
};

UserSchema.removeAll = result => {
    mysql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = UserSchema;

// module.exports = mongoose.model('Video', UserSchema);