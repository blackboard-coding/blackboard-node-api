const mysql = require('mysql');


const ShopSchema = function (Shop) {
    this.avatar = Shop.avatar;
    this.name = Shop.name;
    this.favorite = Shop.favorite;
    this.vote = Shop.vote;
    this.comment = Shop.comment;
    this.lesson = Shop.lesson;
};

ShopSchema.create = (newShop, result) => {
    mysql.query("INSERT INTO shops SET ?", newShop, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ShopSchema: ", { id: res.insertId, ...newShop });
        result(null, { id: res.insertId, ...newShop });
    });
};

ShopSchema.findById = (ShopId, result) => {
    mysql.query(`SELECT * FROM shops WHERE id = ${ShopId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found shops: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Shop with the id
        result({ kind: "not_found" }, null);
    });
};

ShopSchema.getAll = result => {
    mysql.query("SELECT * FROM shops", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("shops: ", res);
        result(null, res);
    });
};

ShopSchema.updateById = (id, Shop, result) => {
    mysql.query(
        "UPDATE shops SET email = ?, name = ?, active = ? WHERE id = ?",
        [Shop.email, Shop.name, Shop.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Shop with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated shops: ", { id: id, ...Shop });
            result(null, { id: id, ...Shop });
        }
    );
};

ShopSchema.remove = (id, result) => {
    mysql.query("DELETE FROM shops WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ShopSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted shops with id: ", id);
        result(null, res);
    });
};

ShopSchema.removeAll = result => {
    mysql.query("DELETE FROM shops", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} shops`);
        result(null, res);
    });
};

module.exports = ShopSchema;
