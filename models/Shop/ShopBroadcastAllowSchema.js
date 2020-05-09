// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const ShopBroadcastAllowSchema = function (ShopBroadcastAllow) {
    // // this.id = ShopBroadcastAllow.id;
    this.shop_id = ShopBroadcastAllow.shop_id;
};

ShopBroadcastAllowSchema.create = (newShopBroadcastAllow, result) => {
    mysql.query("INSERT INTO shop_broadcast_allows SET ?", newShopBroadcastAllow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created shop_broadcast_allows: ", { id: res.insertId, ...newShopBroadcastAllow });
        result(null, { id: res.insertId, ...newShopBroadcastAllow });
    });
};

ShopBroadcastAllowSchema.findById = (ShopBroadcastAllowId, result) => {
    mysql.query(`SELECT * FROM shop_broadcast_allows WHERE id = ${ShopBroadcastAllowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found shop_broadcast_allows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

ShopBroadcastAllowSchema.getAll = result => {
    mysql.query("SELECT * FROM shop_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("shop_broadcast_allows: ", res);
        result(null, res);
    });
};

// ShopBroadcastAllowSchema.updateById = (id, ShopBroadcastAllow, result) => {
//     mysql.query(
//         "UPDATE shop_broadcast_allows SET shop_id = ? WHERE id = ?",
//         [ShopBroadcastAllow.shop_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found ShopBroadcastAllow with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated shop_broadcast_allows: ", { id: id, ...ShopBroadcastAllow });
//             result(null, { id: id, ...ShopBroadcastAllow });
//         }
//     );
// };

ShopBroadcastAllowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM shop_broadcast_allows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ShopBroadcastAllowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted shop_broadcast_allows with id: ", id);
        result(null, res);
    });
};

ShopBroadcastAllowSchema.removeAll = result => {
    mysql.query("DELETE FROM shop_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} shop_broadcast_allows`);
        result(null, res);
    });
};

module.exports = ShopBroadcastAllowSchema;

// module.exports = mongoose.model('Video', ShopBroadcastAllowSchema);