// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// WalletCheckInBroadcastAllow
const WalletCheckInBroadcastAllowSchema = function (WalletCheckInBroadcastAllow) {
    // // this.id = WalletCheckInBroadcastAllow.id;
    this.wallet_check_in_id = WalletCheckInBroadcastAllow.wallet_check_in_id;
};

WalletCheckInBroadcastAllowSchema.create = (newWalletCheckInBroadcastAllow, result) => {
    mysql.query("INSERT INTO wallet_check_in_broadcast_allows SET ?", newWalletCheckInBroadcastAllow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_in_broadcast_allows: ", { id: res.insertId, ...newWalletCheckInBroadcastAllow });
        result(null, { id: res.insertId, ...newWalletCheckInBroadcastAllow });
    });
};

WalletCheckInBroadcastAllowSchema.findById = (WalletCheckInBroadcastAllowId, result) => {
    mysql.query(`SELECT * FROM wallet_check_in_broadcast_allows WHERE id = ${WalletCheckInBroadcastAllowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_in_broadcast_allows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found WalletCheckInBroadcastAllow with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckInBroadcastAllowSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_in_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_in_broadcast_allows: ", res);
        result(null, res);
    });
};

// WalletCheckInBroadcastAllowSchema.updateById = (id, WalletCheckInBroadcastAllow, result) => {
//     mysql.query(
//         "UPDATE wallet_check_in_broadcast_allows SET wallet_check_in_id = ? WHERE id = ?",
//         [WalletCheckInBroadcastAllow.wallet_check_in_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found WalletCheckInBroadcastAllow with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated wallet_check_in_broadcast_allows: ", { id: id, ...WalletCheckInBroadcastAllow });
//             result(null, { id: id, ...WalletCheckInBroadcastAllow });
//         }
//     );
// };

WalletCheckInBroadcastAllowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_allows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckInBroadcastAllowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_in_broadcast_allows with id: ", id);
        result(null, res);
    });
};

WalletCheckInBroadcastAllowSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_in_broadcast_allows`);
        result(null, res);
    });
};

module.exports = WalletCheckInBroadcastAllowSchema;

// module.exports = mongoose.model('WalletCheckInBroadcastAllow', WalletCheckInBroadcastAllowSchema);