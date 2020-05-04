const mysql = require('mysql');


const OldListAllCategorySchema = function (OldListAllCategory) {
    this.icon = OldListAllCategory.icon;
    this.title = OldListAllCategory.title;
};

OldListAllCategorySchema.create = (newOldListAllCategory, result) => {
    mysql.query("INSERT INTO old_list_all_categorys SET ?", newOldListAllCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created old_list_all_categorys: ", { id: res.insertId, ...newOldListAllCategory });
        result(null, { id: res.insertId, ...newOldListAllCategory });
    });
};

OldListAllCategorySchema.findById = (OldListAllCategoryId, result) => {
    mysql.query(`SELECT * FROM old_list_all_categorys WHERE id = ${OldListAllCategoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found old_list_all_categorys: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found old_list_all_categorys with the id
        result({ kind: "not_found" }, null);
    });
};

OldListAllCategorySchema.getAll = result => {
    mysql.query("SELECT * FROM old_list_all_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("old_list_all_categorys: ", res);
        result(null, res);
    });
};

OldListAllCategorySchema.updateById = (id, OldListAllCategory, result) => {
    mysql.query(
        "UPDATE old_list_all_categorys SET email = ?, name = ?, active = ? WHERE id = ?",
        [OldListAllCategory.email, OldListAllCategory.name, OldListAllCategory.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found OldListAllCategory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated old_list_all_categorys: ", { id: id, ...OldListAllCategory });
            result(null, { id: id, ...OldListAllCategory });
        }
    );
};

OldListAllCategorySchema.remove = (id, result) => {
    mysql.query("DELETE FROM old_list_all_categorys WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found old_list_all_categorys with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted old_list_all_categorys with id: ", id);
        result(null, res);
    });
};

OldListAllCategorySchema.removeAll = result => {
    mysql.query("DELETE FROM old_list_all_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} old_list_all_categorys`);
        result(null, res);
    });
};

module.exports = OldListAllCategorySchema;
