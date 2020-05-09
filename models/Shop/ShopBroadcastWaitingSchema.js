// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const ShopBroadcastWaitingSchema = function (ShopBroadcastWaiting) {
    // // this.id = ShopBroadcastWaiting.id;
    this.shop_id = ShopBroadcastWaiting.shop_id;
};

ShopBroadcastWaitingSchema.create = (newShopBroadcastWaiting, result) => {
    mysql.query("INSERT INTO shop_broadcast_waitings SET ?", newShopBroadcastWaiting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created shop_broadcast_waitings: ", { id: res.insertId, ...newShopBroadcastWaiting });
        result(null, { id: res.insertId, ...newShopBroadcastWaiting });
    });
};

ShopBroadcastWaitingSchema.findById = (ShopBroadcastWaitingId, result) => {
    mysql.query(`SELECT * FROM shop_broadcast_waitings WHERE id = ${ShopBroadcastWaitingId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found shop_broadcast_waitings: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

ShopBroadcastWaitingSchema.getAll = result => {
    mysql.query("SELECT * FROM shop_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("shop_broadcast_waitings: ", res);
        result(null, res);
    });
};

// ShopBroadcastWaitingSchema.updateById = (id, ShopBroadcastWaiting, result) => {
//     mysql.query(
//         "UPDATE shop_broadcast_waitings SET shop_id = ? WHERE id = ?",
//         [ShopBroadcastWaiting.shop_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found ShopBroadcastWaiting with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated shop_broadcast_waitings: ", { id: id, ...ShopBroadcastWaiting });
//             result(null, { id: id, ...ShopBroadcastWaiting });
//         }
//     );
// };

ShopBroadcastWaitingSchema.remove = (id, result) => {
    mysql.query("DELETE FROM shop_broadcast_waitings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ShopBroadcastWaitingSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted shop_broadcast_waitings with id: ", id);
        result(null, res);
    });
};

ShopBroadcastWaitingSchema.removeAll = result => {
    mysql.query("DELETE FROM shop_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} shop_broadcast_waitings`);
        result(null, res);
    });
};

module.exports = ShopBroadcastWaitingSchema;

// module.exports = mongoose.model('Video', ShopBroadcastWaitingSchema);