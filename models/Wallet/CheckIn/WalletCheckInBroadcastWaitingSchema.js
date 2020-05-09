// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// WalletCheckInBroadcastWaiting
const WalletCheckInBroadcastWaitingSchema = function (WalletCheckInBroadcastWaiting) {
    // // this.id = WalletCheckInBroadcastWaiting.id;
    this.wallet_check_in_id = WalletCheckInBroadcastWaiting.wallet_check_in_id;
};

WalletCheckInBroadcastWaitingSchema.create = (newWalletCheckInBroadcastWaiting, result) => {
    mysql.query("INSERT INTO wallet_check_in_broadcast_waitings SET ?", newWalletCheckInBroadcastWaiting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_in_broadcast_waitings: ", { id: res.insertId, ...newWalletCheckInBroadcastWaiting });
        result(null, { id: res.insertId, ...newWalletCheckInBroadcastWaiting });
    });
};

WalletCheckInBroadcastWaitingSchema.findById = (WalletCheckInBroadcastWaitingId, result) => {
    mysql.query(`SELECT * FROM wallet_check_in_broadcast_waitings WHERE id = ${WalletCheckInBroadcastWaitingId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_in_broadcast_waitings: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckInBroadcastWaitingSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_in_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_in_broadcast_waitings: ", res);
        result(null, res);
    });
};

// WalletCheckInBroadcastWaitingSchema.updateById = (id, WalletCheckInBroadcastWaiting, result) => {
//     mysql.query(
//         "UPDATE wallet_check_in_broadcast_waitings SET wallet_check_in_id = ? WHERE id = ?",
//         [WalletCheckInBroadcastWaiting.wallet_check_in_id, id],
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

//             console.log("updated wallet_check_in_broadcast_waitings: ", { id: id, ...Video });
//             result(null, { id: id, ...Video });
//         }
//     );
// };

WalletCheckInBroadcastWaitingSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_waitings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckInBroadcastWaitingSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_in_broadcast_waitings with id: ", id);
        result(null, res);
    });
};

WalletCheckInBroadcastWaitingSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_waitings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_in_broadcast_waitings`);
        result(null, res);
    });
};

module.exports = WalletCheckInBroadcastWaitingSchema;

// module.exports = mongoose.model('Video', WalletCheckInBroadcastWaitingSchema);