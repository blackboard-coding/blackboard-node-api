// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// video
const WalletCheckInSchema = function (WalletCheckIn) {
    // // this.id =  WalletCheckIn.id;
    this.user_id = WalletCheckIn.user_id;
    this.type = WalletCheckIn.type;
    this.broadcast_type = WalletCheckIn.broadcast_type;
    this.last_name = WalletCheckIn.last_name;
    this.frist_name = WalletCheckIn.frist_name;
    this.account_number = WalletCheckIn.account_number;
    this.number_phone = WalletCheckIn.number_phone;
    this.bank_name = WalletCheckIn.bank_name;
    this.coin = WalletCheckIn.coin;
    this.image = WalletCheckIn.image;
};

WalletCheckInSchema.create = (newWalletCheckIn, result) => {
    mysql.query("INSERT INTO wallet_check_ins SET ?", newWalletCheckIn, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created wallet_check_ins: ", { id: res.insertId, ...newWalletCheckIn });
        result(null, { id: res.insertId, ...newWalletCheckIn });
    });
};

WalletCheckInSchema.findById = (WalletCheckInId, result) => {
    mysql.query(`SELECT * FROM wallet_check_ins WHERE id = ${WalletCheckInId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found wallet_check_ins: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

WalletCheckInSchema.getAll = result => {
    mysql.query("SELECT * FROM wallet_check_ins", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("wallet_check_ins: ", res);
        result(null, res);
    });
};

WalletCheckInSchema.updateById = (id, WalletCheckIn, result) => {
    mysql.query(
        "UPDATE wallet_check_ins SET type = ?, last_name = ?, frist_name = ?, account_number = ?, number_phone = ?, bank_name = ?, coin = ?, image = ? WHERE id = ?",
        [
            //   WalletCheckIn.user_id,
            WalletCheckIn.type,
            //   WalletCheckIn.broadcast_type,
            WalletCheckIn.last_name,
            WalletCheckIn.frist_name,
            WalletCheckIn.account_number,
            WalletCheckIn.number_phone,
            WalletCheckIn.bank_name,
            WalletCheckIn.coin,
            WalletCheckIn.image,
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

            console.log("updated wallet_check_ins: ", { id: id, ...Video });
            result(null, { id: id, ...Video });
        }
    );
};

WalletCheckInSchema.remove = (id, result) => {
    mysql.query("DELETE FROM wallet_check_ins WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found WalletCheckInSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted wallet_check_ins with id: ", id);
        result(null, res);
    });
};

WalletCheckInSchema.removeAll = result => {
    mysql.query("DELETE FROM wallet_check_ins", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} wallet_check_ins`);
        result(null, res);
    });
};

module.exports = WalletCheckInSchema;

// module.exports = mongoose.model('Video', WalletCheckInSchema);