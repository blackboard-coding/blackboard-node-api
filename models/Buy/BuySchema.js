// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mysql = require('mysql');





// Buy
const BuySchema = function (Buy) {
    // // this.id = Buy.id;
    this.video_id = Buy.video_id;
    this.user_id = Buy.user_id;
};

BuySchema.create = (newBuy, result) => {
    mysql.query("INSERT INTO buys SET ?", newBuy, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created buys: ", { id: res.insertId, ...newBuy });
        result(null, { id: res.insertId, ...newBuy });
    });
};

BuySchema.findById = (BuyId, result) => {
    mysql.query(`SELECT * FROM buys WHERE id = ${BuyId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found buys: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

BuySchema.getAll = result => {
    mysql.query("SELECT * FROM buys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("buys: ", res);
        result(null, res);
    });
};

// BuySchema.updateById = (id, Buy, result) => {
//     mysql.query(
//         "UPDATE buys SET name = ?,img = ? WHERE id = ?",
//         [Buy.name, Buy.img, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Buy with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated buys: ", { id: id, ...Buy });
//             result(null, { id: id, ...Buy });
//         }
//     );
// };

BuySchema.remove = (id, result) => {
    mysql.query("DELETE FROM buys WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found BuySchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted buys with id: ", id);
        result(null, res);
    });
};

BuySchema.removeAll = result => {
    mysql.query("DELETE FROM buys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} buys`);
        result(null, res);
    });
};

module.exports = BuySchema;

// module.exports = mongoose.model('Video', BuySchema);