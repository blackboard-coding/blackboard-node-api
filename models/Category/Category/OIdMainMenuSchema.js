const mysql = require('mysql');


const OldMainMenuSchema = function (OldMainMenu) {
    this.name = OldMainMenu.name;
    this.image = OldMainMenu.image;
    this.url = OldMainMenu.url;
};

OldMainMenuSchema.create = (newOldMainMenu, result) => {
    mysql.query("INSERT INTO old_main_menus SET ?", newOldMainMenu, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created old_main_menus: ", { id: res.insertId, ...newOldMainMenu });
        result(null, { id: res.insertId, ...newOldMainMenu });
    });
};

OldMainMenuSchema.findById = (OldMainMenuId, result) => {
    mysql.query(`SELECT * FROM old_main_menus WHERE id = ${OldMainMenuId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found old_main_menus: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found old_main_menus with the id
        result({ kind: "not_found" }, null);
    });
};

OldMainMenuSchema.getAll = result => {
    mysql.query("SELECT * FROM old_main_menus", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("old_main_menus: ", res);
        result(null, res);
    });
};

OldMainMenuSchema.updateById = (id, OldMainMenu, result) => {
    mysql.query(
        "UPDATE old_main_menus SET email = ?, name = ?, active = ? WHERE id = ?",
        [OldMainMenu.email, OldMainMenu.name, OldMainMenu.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found OldMainMenu with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated old_main_menus: ", { id: id, ...OldMainMenu });
            result(null, { id: id, ...OldMainMenu });
        }
    );
};

OldMainMenuSchema.remove = (id, result) => {
    mysql.query("DELETE FROM old_main_menus WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found old_main_menus with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted old_main_menus with id: ", id);
        result(null, res);
    });
};

OldMainMenuSchema.removeAll = result => {
    mysql.query("DELETE FROM old_main_menus", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} old_main_menus`);
        result(null, res);
    });
};

module.exports = OldMainMenuSchema;
