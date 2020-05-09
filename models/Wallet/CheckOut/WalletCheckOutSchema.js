// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// WalletCheckOut
const WalletCheckOutSchema = function (WalletCheckOut) {
    // // this.id =  WalletCheckOut.id;
    this.user_id = WalletCheckOut.user_id;
    this.type = WalletCheckOut.type;
    this.broadcast_type = WalletCheckOut.broadcast_type;
    this.last_name = WalletCheckOut.last_name;
    this.frist_name = WalletCheckOut.frist_name;
    this.account_number = WalletCheckOut.account_number;
    this.number_phone = WalletCheckOut.number_phone;
    this.bank_name = WalletCheckOut.bank_name;
    this.coin = WalletCheckOut.coin;
};

WalletCheckOutSchema.create = (newWalletCheckOut, result) => {
    mysql.query("INSERT INTO wallet_check_outs SET ?", newWalletCheckOut, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_outs: ", { id: res.insertId, ...newWalletCheckOut });
        result(null, { id: res.insertId, ...newWalletCheckOut });
    });
};

WalletCheckOutSchema.findById = (WalletCheckOutId, result) => {
    mysql.query(`SELECT * FROM wallet_check_outs WHERE id = ${WalletCheckOutId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_outs: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckOutSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_outs", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_outs: ", res);
        result(null, res);
    });
};

WalletCheckOutSchema.updateById = (id, WalletCheckOut, result) => {
    mysql.query(
        "UPDATE wallet_check_outs SET type = ?, last_name = ?, frist_name = ?, account_number = ?, number_phone = ?, bank_name = ?, coin = ? WHERE id = ?",
        [
            //   WalletCheckOut.user_id,
            WalletCheckOut.type,
            //   WalletCheckOut.broadcast_type,
            WalletCheckOut.last_name,
            WalletCheckOut.frist_name,
            WalletCheckOut.account_number,
            WalletCheckOut.number_phone,
            WalletCheckOut.bank_name,
            WalletCheckOut.coin,
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Video with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated wallet_check_outs: ", { id: id, ...Video });
            result(null, { id: id, ...Video });
        }
    );
};

WalletCheckOutSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_outs WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckOutSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_outs with id: ", id);
        result(null, res);
    });
};

WalletCheckOutSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_outs", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_outs`);
        result(null, res);
    });
};

module.exports = WalletCheckOutSchema;

// module.exports = mongoose.model('Video', WalletCheckOutSchema);