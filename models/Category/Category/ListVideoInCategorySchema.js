const mysql = require('mysql');


const ListVideoInCategorySchema = function (ListVideoInCategory) {
    this.image = ListVideoInCategory.image;
    this.title = ListVideoInCategory.title;
    this.rating = ListVideoInCategory.rating;
    this.count = ListVideoInCategory.count;
    this.price = ListVideoInCategory.price;
    this.discount = ListVideoInCategory.discount;
    this.net = ListVideoInCategory.net;
    this.favorite = ListVideoInCategory.favorite
};

ListVideoInCategorySchema.create = (newListVideoInCategory, result) => {
    mysql.query("INSERT INTO list_video_in_categorys SET ?", newListVideoInCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created list_video_in_categorys: ", { id: res.insertId, ...newListVideoInCategory });
        result(null, { id: res.insertId, ...newListVideoInCategory });
    });
};

ListVideoInCategorySchema.findById = (ListVideoInCategoryId, result) => {
    mysql.query(`SELECT * FROM list_video_in_categorys WHERE id = ${ListVideoInCategoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found list_video_in_categorys: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ListVideoInCategory with the id
        result({ kind: "not_found" }, null);
    });
};

ListVideoInCategorySchema.getAll = result => {
    mysql.query("SELECT * FROM list_video_in_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("list_video_in_categorys: ", res);
        result(null, res);
    });
};

ListVideoInCategorySchema.updateById = (id, ListVideoInCategory, result) => {
    mysql.query(
        "UPDATE list_video_in_categorys SET email = ?, name = ?, active = ? WHERE id = ?",
        [ListVideoInCategory.email, ListVideoInCategory.name, ListVideoInCategory.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ListVideoInCategory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated list_video_in_categorys: ", { id: id, ...ListVideoInCategory });
            result(null, { id: id, ...ListVideoInCategory });
        }
    );
};

ListVideoInCategorySchema.remove = (id, result) => {
    mysql.query("DELETE FROM list_video_in_categorys WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found list_video_in_categorys with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted list_video_in_categorys with id: ", id);
        result(null, res);
    });
};

ListVideoInCategorySchema.removeAll = result => {
    mysql.query("DELETE FROM list_video_in_categorys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} list_video_in_categorys`);
        result(null, res);
    });
};

module.exports = ListVideoInCategorySchema;
