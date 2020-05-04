const mysql = require('mysql');


const CategoryTwoSchema = function (CategoryTwo) {
    this.id = CategoryTwo.id;
    this.name = CategoryTwo.name;
    this.image = CategoryTwo.image;
    this.url = CategoryTwo.url;
};

CategoryTwoSchema.create = (newCategoryTwo, result) => {
    mysql.query("INSERT INTO category_twos SET ?", newCategoryTwo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created category_twos: ", { id: res.insertId, ...newCategoryTwo });
        result(null, { id: res.insertId, ...newCategoryTwo });
    });
};

CategoryTwoSchema.findById = (CategoryTwoId, result) => {
    mysql.query(`SELECT * FROM category_twos WHERE id = ${CategoryTwoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found category_twos: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found category_twos with the id
        result({ kind: "not_found" }, null);
    });
};

CategoryTwoSchema.getAll = result => {
    mysql.query("SELECT * FROM category_twos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("category_twos: ", res);
        result(null, res);
    });
};

CategoryTwoSchema.updateById = (id, CategoryTwo, result) => {
    mysql.query(
        "UPDATE category_twos SET email = ?, name = ?, active = ? WHERE id = ?",
        [CategoryTwo.email, CategoryTwo.name, CategoryTwo.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found CategoryTwo with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated category_twos: ", { id: id, ...CategoryTwo });
            result(null, { id: id, ...CategoryTwo });
        }
    );
};

CategoryTwoSchema.remove = (id, result) => {
    mysql.query("DELETE FROM category_twos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found category_twos with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted category_twos with id: ", id);
        result(null, res);
    });
};

CategoryTwoSchema.removeAll = result => {
    mysql.query("DELETE FROM category_twos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} category_twos`);
        result(null, res);
    });
};

module.exports = CategoryTwoSchema;
