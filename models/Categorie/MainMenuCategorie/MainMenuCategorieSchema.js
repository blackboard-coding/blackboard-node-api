// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// MainMenuCategorie
const MainMenuCategorieSchema = function (MainMenuCategorie) {
    // // this.id = MainMenuCategorie.id;
    // // this.number = MainMenuCategorie.number;
    this.title = MainMenuCategorie.title;
    this.icon = MainMenuCategorie.icon;
    this.url = MainMenuCategorie.url;
};

MainMenuCategorieSchema.create = (newMainMenuCategorie, result) => {
    mysql.query("INSERT INTO main_menu_categores SET ?", newMainMenuCategorie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created main_menu_categores: ", { id: res.insertId, ...newMainMenuCategorie });
        result(null, { id: res.insertId, ...newMainMenuCategorie });
    });
};

MainMenuCategorieSchema.findById = (MainMenuCategorieId, result) => {
    mysql.query(`SELECT * FROM main_menu_categores WHERE id = ${MainMenuCategorieId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found main_menu_categores: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

MainMenuCategorieSchema.getAll = result => {
    mysql.query("SELECT * FROM main_menu_categores", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("main_menu_categores: ", res);
        result(null, res);
    });
};

MainMenuCategorieSchema.updateById = (id, MainMenuCategorie, result) => {
    mysql.query(
        "UPDATE main_menu_categores SET title = ?,icon = ? WHERE id = ?",
        [MainMenuCategorie.title, MainMenuCategorie.icon, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MainMenuCategorie with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated main_menu_categores: ", { id: id, ...MainMenuCategorie });
            result(null, { id: id, ...MainMenuCategorie });
        }
    );
};

MainMenuCategorieSchema.remove = (id, result) => {
    mysql.query("DELETE FROM main_menu_categores WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MainMenuCategorieSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted main_menu_categores with id: ", id);
        result(null, res);
    });
};

MainMenuCategorieSchema.removeAll = result => {
    mysql.query("DELETE FROM main_menu_categores", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} main_menu_categores`);
        result(null, res);
    });
};

module.exports = MainMenuCategorieSchema;

// module.exports = mongoose.model('Video', MainMenuCategorieSchema);