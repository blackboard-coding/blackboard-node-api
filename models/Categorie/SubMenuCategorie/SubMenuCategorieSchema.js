// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// SubMenuCategorie
const SubMenuCategorieSchema = function (SubMenuCategorie) {
    // // this.id = SubMenuCategorie.id;
    // // this.number = SubMenuCategorie.number;
    this.title = SubMenuCategorie.title;
    this.icon = SubMenuCategorie.icon;
    this.bg_image = SubMenuCategorie.bg_image;
    this.url = MainMenuCategorie.url;
};

SubMenuCategorieSchema.create = (newSubMenuCategorie, result) => {
    mysql.query("INSERT INTO sub_menu_categores SET ?", newSubMenuCategorie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created sub_menu_categores: ", { id: res.insertId, ...newSubMenuCategorie });
        result(null, { id: res.insertId, ...newSubMenuCategorie });
    });
};

SubMenuCategorieSchema.findById = (SubMenuCategorieId, result) => {
    mysql.query(`SELECT * FROM sub_menu_categores WHERE id = ${SubMenuCategorieId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found sub_menu_categores: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

SubMenuCategorieSchema.getAll = result => {
    mysql.query("SELECT * FROM sub_menu_categores", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("sub_menu_categores: ", res);
        result(null, res);
    });
};

SubMenuCategorieSchema.updateById = (id, SubMenuCategorie, result) => {
    mysql.query(
        "UPDATE sub_menu_categores SET title = ?,icon = ?,bg_image = ? WHERE id = ?",
        [SubMenuCategorie.title, SubMenuCategorie.icon, SubMenuCategorie.bg_image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SubMenuCategorie with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated sub_menu_categores: ", { id: id, ...SubMenuCategorie });
            result(null, { id: id, ...SubMenuCategorie });
        }
    );
};

SubMenuCategorieSchema.remove = (id, result) => {
    mysql.query("DELETE FROM sub_menu_categores WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SubMenuCategorieSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted sub_menu_categores with id: ", id);
        result(null, res);
    });
};

SubMenuCategorieSchema.removeAll = result => {
    mysql.query("DELETE FROM sub_menu_categores", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} sub_menu_categores`);
        result(null, res);
    });
};

module.exports = SubMenuCategorieSchema;

// module.exports = mongoose.model('Video', SubMenuCategorieSchema);