// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// newWalletCheckInBroadcastDisallow
const WalletCheckInBroadcastDisallowSchema = function (newWalletCheckInBroadcastDisallow) {
    // // this.id = newWalletCheckInBroadcastDisallow.id;
    this.wallet_check_in_id = newWalletCheckInBroadcastDisallow.wallet_check_in_id;
    this.message = newWalletCheckInBroadcastDisallow.message;
};

WalletCheckInBroadcastDisallowSchema.create = (newWalletCheckInBroadcastDisallow, result) => {
    mysql.query("INSERT INTO wallet_check_in_broadcast_disallows SET ?", newWalletCheckInBroadcastDisallow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_in_broadcast_disallows: ", { id: res.insertId, ...newWalletCheckInBroadcastDisallow });
        result(null, { id: res.insertId, ...newWalletCheckInBroadcastDisallow });
    });
};

WalletCheckInBroadcastDisallowSchema.findById = (WalletCheckInBroadcastDisallowId, result) => {
    mysql.query(`SELECT * FROM wallet_check_in_broadcast_disallows WHERE id = ${WalletCheckInBroadcastDisallowId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_in_broadcast_disallows: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found newWalletCheckInBroadcastDisallow with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckInBroadcastDisallowSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_in_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_in_broadcast_disallows: ", res);
        result(null, res);
    });
};

WalletCheckInBroadcastDisallowSchema.updateById = (id, WalletCheckInBroadcastDisallow, result) => {
    mysql.query(
        "UPDATE wallet_check_in_broadcast_disallows SET message = ? WHERE id = ?",
        [WalletCheckInBroadcastDisallow.message, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found newWalletCheckInBroadcastDisallow with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated wallet_check_in_broadcast_disallows: ", { id: id, ...newWalletCheckInBroadcastDisallow });
            result(null, { id: id, ...newWalletCheckInBroadcastDisallow });
        }
    );
};

WalletCheckInBroadcastDisallowSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_disallows WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckInBroadcastDisallowSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_in_broadcast_disallows with id: ", id);
        result(null, res);
    });
};

WalletCheckInBroadcastDisallowSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_in_broadcast_disallows", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_in_broadcast_disallows`);
        result(null, res);
    });
};

module.exports = WalletCheckInBroadcastDisallowSchema;

// module.exports = mongoose.model('newWalletCheckInBroadcastDisallow', WalletCheckInBroadcastDisallowSchema);