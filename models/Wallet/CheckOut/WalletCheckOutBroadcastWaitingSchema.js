// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// WalletCheckOutBroadcastWaiting
const WalletCheckOutBroadcastWaitingSchema = function (WalletCheckOutBroadcastWaiting) {
    // // this.id = WalletCheckOutBroadcastWaiting.id;
    this.wallet_check_out_id = WalletCheckOutBroadcastWaiting.wallet_check_out_id;
};

WalletCheckOutBroadcastWaitingSchema.create = (newWalletCheckOutBroadcastWaiting, result) => {
    mysql.query("INSERT INTO wallet_check_out_broadcast_waitings SET ?", newWalletCheckOutBroadcastWaiting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_out_broadcast_waitings: ", { id: res.insertId, ...newWalletCheckOutBroadcastWaiting });
        result(null, { id: res.insertId, ...newWalletCheckOutBroadcastWaiting });
    });
};

WalletCheckOutBroadcastWaitingSchema.findById = (WalletCheckOutBroadcastWaitingId, result) => {
    mysql.query(`SELECT * FROM wallet_check_out_broadcast_waitings WHERE id = ${WalletCheckOutBroadcastWaitingId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_out_broadcast_waitings: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckOutBroadcastWaitingSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_out_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_out_broadcast_waitings: ", res);
        result(null, res);
    });
};

// WalletCheckOutBroadcastWaitingSchema.updateById = (id, WalletCheckOutBroadcastWaiting, result) => {
//     mysql.query(
//         "UPDATE wallet_check_out_broadcast_waitings SET wallet_check_out_id = ? WHERE id = ?",
//         [WalletCheckOutBroadcastWaiting.wallet_check_out_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Video with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated wallet_check_out_broadcast_waitings: ", { id: id, ...Video });
//             result(null, { id: id, ...Video });
//         }
//     );
// };

WalletCheckOutBroadcastWaitingSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_waitings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckOutBroadcastWaitingSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_out_broadcast_waitings with id: ", id);
        result(null, res);
    });
};

WalletCheckOutBroadcastWaitingSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_out_broadcast_waitings`);
        result(null, res);
    });
};

module.exports = WalletCheckOutBroadcastWaitingSchema;

// module.exports = mongoose.model('Video', WalletCheckOutBroadcastWaitingSchema);