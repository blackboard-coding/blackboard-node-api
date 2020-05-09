// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// newWalletCheckOutBroadcastDisallow
const WalletCheckOutBroadcastDisallowSchema = function (newWalletCheckOutBroadcastDisallow) {
    // // this.id = newWalletCheckOutBroadcastDisallow.id;
    this.wallet_check_out_id = newWalletCheckOutBroadcastDisallow.wallet_check_out_id;
    this.message = newWalletCheckOutBroadcastDisallow.message;
};

WalletCheckOutBroadcastDisallowSchema.create = (newWalletCheckOutBroadcastDisallow, result) => {
    mysql.query("INSERT INTO wallet_check_out_broadcast_disallows SET ?", newWalletCheckOutBroadcastDisallow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_out_broadcast_disallows: ", { id: res.insertId, ...newWalletCheckOutBroadcastDisallow });
        result(null, { id: res.insertId, ...newWalletCheckOutBroadcastDisallow });
    });
};

WalletCheckOutBroadcastDisallowSchema.findById = (WalletCheckOutBroadcastDisallowId, result) => {
    mysql.query(`SELECT * FROM wallet_check_out_broadcast_disallows WHERE id = ${WalletCheckOutBroadcastDisallowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_out_broadcast_disallows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found newWalletCheckOutBroadcastDisallow with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckOutBroadcastDisallowSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_out_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_out_broadcast_disallows: ", res);
        result(null, res);
    });
};

WalletCheckOutBroadcastDisallowSchema.updateById = (id, WalletCheckOutBroadcastDisallow, result) => {
    mysql.query(
        "UPDATE wallet_check_out_broadcast_disallows SET message = ? WHERE id = ?",
        [WalletCheckOutBroadcastDisallow.message, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found newWalletCheckOutBroadcastDisallow with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated wallet_check_out_broadcast_disallows: ", { id: id, ...newWalletCheckOutBroadcastDisallow });
            result(null, { id: id, ...newWalletCheckOutBroadcastDisallow });
        }
    );
};

WalletCheckOutBroadcastDisallowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_disallows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckOutBroadcastDisallowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_out_broadcast_disallows with id: ", id);
        result(null, res);
    });
};

WalletCheckOutBroadcastDisallowSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_out_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_out_broadcast_disallows`);
        result(null, res);
    });
};

module.exports = WalletCheckOutBroadcastDisallowSchema;

// module.exports = mongoose.model('newWalletCheckOutBroadcastDisallow', WalletCheckOutBroadcastDisallowSchema);