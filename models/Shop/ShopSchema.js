// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// Shop
const ShopSchema = function (Shop) {
    // // this.id = Shop.id;
    this.user_id = Shop.user_id;
    // // this.number = Shop.number;
    this.name = Shop.name;
    this.broadcast_type = Shop.broadcast_type;
    this.image = Shop.image;
    this.bg_image = Shop.bg_image;
    this.detail = Shop.detail;
    this.favorite = Shop.favorite;
    this.email = Shop.email;
    this.number_phone = Shop.number_phone;
    this.fb = Shop.fb;
    this.line = Shop.line;
    this.ig = Shop.ig;
    this.view = Shop.view;
    // // this.updated = Shop.updated;
    this.comment = Shop.comment;
};

ShopSchema.create = (newShop, result) => {
    mysql.query("INSERT INTO shops SET ?", newShop, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created shops: ", { id: res.insertId, ...newShop });
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

        // not found Video with the id
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
        "UPDATE shops SET name = ?, detail = ?, image = ?, title = ?, bg_image = ?, email = ?, number_phone = ?, fb = ?, line = ?, ig = ? WHERE id = ?",
        [

            // Shop.user_id,
            // // .number = Shop.number,
            Shop.name,
            Shop.detail,
            // Shop.broadcast_type,
            Shop.image,
            Shop.bg_image,
            // Shop.favorite,
            Shop.email,
            Shop.number_phone,
            Shop.fb,
            Shop.line,
            Shop.ig,
            // Shop.view,
            // // .updated = Shop.updated,
            // Shop.comment,
            id
        ],
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

// module.exports = mongoose.model('Video', ShopSchema);