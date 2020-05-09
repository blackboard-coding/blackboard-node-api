// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const ShopBroadcastDisallowSchema = function (ShopBroadcastDisallow) {
    // // this.id = Video.id;
    this.shop_id = ShopBroadcastDisallow.shop_id;
    this.message = ShopBroadcastDisallow.message;
};

ShopBroadcastDisallowSchema.create = (newShopBroadcastDisallow, result) => {
    mysql.query("INSERT INTO shop_broadcast_disallows SET ?", newShopBroadcastDisallow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created shop_broadcast_disallows: ", { id: res.insertId, ...newShopBroadcastDisallow });
        result(null, { id: res.insertId, ...newShopBroadcastDisallow });
    });
};

ShopBroadcastDisallowSchema.findById = (ShopBroadcastDisallowId, result) => {
    mysql.query(`SELECT * FROM shop_broadcast_disallows WHERE id = ${ShopBroadcastDisallowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found shop_broadcast_disallows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

ShopBroadcastDisallowSchema.getAll = result => {
    mysql.query("SELECT * FROM shop_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("shop_broadcast_disallows: ", res);
        result(null, res);
    });
};

ShopBroadcastDisallowSchema.updateById = (id, ShopBroadcastDisallow, result) => {
    mysql.query(
        "UPDATE shop_broadcast_disallows SET message = ? WHERE id = ?",
        [ShopBroadcastDisallow.message, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ShopBroadcastDisallow with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated shop_broadcast_disallows: ", { id: id, ...ShopBroadcastDisallow });
            result(null, { id: id, ...ShopBroadcastDisallow });
        }
    );
};

ShopBroadcastDisallowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM shop_broadcast_disallows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ShopBroadcastDisallowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted shop_broadcast_disallows with id: ", id);
        result(null, res);
    });
};

ShopBroadcastDisallowSchema.removeAll = result => {
    mysql.query("DELETE FROM shop_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} shop_broadcast_disallows`);
        result(null, res);
    });
};

module.exports = ShopBroadcastDisallowSchema;

// module.exports = mongoose.model('Video', ShopBroadcastDisallowSchema);