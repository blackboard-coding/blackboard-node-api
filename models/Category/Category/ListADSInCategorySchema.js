
const mysql = require('mysql');


const ListADSInCategorySchema = function (ListADSInCategory) {
    this.product_id = ListADSInCategory.product_id;
    this.image = ListADSInCategory.image;
    this.title = ListADSInCategory.title;
    this.rating = ListADSInCategory.rating;
    this.count = ListADSInCategory.count;
    this.price = ListADSInCategory.price;
    this.discount = ListADSInCategory.discount;
    this.net = ListADSInCategory.net;
    this.favorite = ListADSInCategory.favorite
};

ListADSInCategorySchema.create = (newListADSInCategory, result) => {
    mysql.query("INSERT INTO list_ads_in_categorys SET ?", newListADSInCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created list_ads_in_categorys: ", { id: res.insertId, ...newListADSInCategory });
        result(null, { id: res.insertId, ...newListADSInCategory });
    });
};

ListADSInCategorySchema.findById = (ListADSInCategoryId, result) => {
    mysql.query(`SELECT * FROM list_ads_in_categorys WHERE id = ${ListADSInCategoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found list_ads_in_categorys: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ListADSInCategory with the id
        result({ kind: "not_found" }, null);
    });
};

ListADSInCategorySchema.getAll = result => {
    mysql.query("SELECT * FROM list_ads_in_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("list_ads_in_categorys: ", res);
        result(null, res);
    });
};

ListADSInCategorySchema.updateById = (id, ListADSInCategory, result) => {
    mysql.query(
        "UPDATE list_ads_in_categorys SET email = ?, name = ?, active = ? WHERE id = ?",
        [ListADSInCategory.email, ListADSInCategory.name, ListADSInCategory.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ListADSInCategory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated list_ads_in_categorys: ", { id: id, ...ListADSInCategory });
            result(null, { id: id, ...ListADSInCategory });
        }
    );
};

ListADSInCategorySchema.remove = (id, result) => {
    mysql.query("DELETE FROM list_ads_in_categorys WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found list_ads_in_categorys with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted list_ads_in_categorys with id: ", id);
        result(null, res);
    });
};

ListADSInCategorySchema.removeAll = result => {
    mysql.query("DELETE FROM list_ads_in_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} list_ads_in_categorys`);
        result(null, res);
    });
};

module.exports = ListADSInCategorySchema;
