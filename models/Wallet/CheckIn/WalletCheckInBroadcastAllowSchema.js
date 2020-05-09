// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// WalletCheckOutBroadcastAllow
const WalletCheckOutBroadcastAllowSchema = function (WalletCheckOutBroadcastAllow) {
    // // this.id = WalletCheckOutBroadcastAllow.id;
    this.wallet_check_in_id = WalletCheckOutBroadcastAllow.wallet_check_in_id;
};

WalletCheckOutBroadcastAllowSchema.create = (newWalletCheckOutBroadcastAllow, result) => {
    mysql.query("INSERT INTO wallet_check_out_broadcast_allows SET ?", newWalletCheckOutBroadcastAllow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_out_broadcast_allows: ", { id: res.insertId, ...newWalletCheckOutBroadcastAllow });
        result(null, { id: res.insertId, ...newWalletCheckOutBroadcastAllow });
    });
};

WalletCheckOutBroadcastAllowSchema.findById = (WalletCheckOutBroadcastAllowId, result) => {
    mysql.query(`SELECT * FROM wallet_check_out_broadcast_allows WHERE id = ${WalletCheckOutBroadcastAllowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_out_broadcast_allows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found WalletCheckOutBroadcastAllow with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckOutBroadcastAllowSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_out_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_out_broadcast_allows: ", res);
        result(null, res);
    });
};

// WalletCheckOutBroadcastAllowSchema.updateById = (id, WalletCheckOutBroadcastAllow, result) => {
//     mysql.query(
//         "UPDATE wallet_check_out_broadcast_allows SET wallet_check_in_id = ?",
//         [WalletCheckOutBroadcastAllow.wallet_check_in_id, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found WalletCheckOutBroadcastAllow with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated wallet_check_out_broadcast_allows: ", { id: id, ...WalletCheckOutBroadcastAllow });
//             result(null, { id: id, ...WalletCheckOutBroadcastAllow });
//         }
//     );
// };

WalletCheckOutBroadcastAllowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_allows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckOutBroadcastAllowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_out_broadcast_allows with id: ", id);
        result(null, res);
    });
};

WalletCheckOutBroadcastAllowSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_allows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_out_broadcast_allows`);
        result(null, res);
    });
};

module.exports = WalletCheckOutBroadcastAllowSchema;

// module.exports = mongoose.model('WalletCheckOutBroadcastAllow', WalletCheckOutBroadcastAllowSchema);