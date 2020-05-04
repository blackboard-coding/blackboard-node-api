const mysql = require('mysql');


const CertificationSchema = function (Certification) {
    this.name = Certification.name;
    this.file = Certification.file;
    this.status = Certification.status;
};

CertificationSchema.create = (newCertification, result) => {
    mysql.query("INSERT INTO certifications SET ?", newCertification, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created certifications: ", { id: res.insertId, ...newCertification });
        result(null, { id: res.insertId, ...newCertification });
    });
};

CertificationSchema.findById = (CertificationId, result) => {
    mysql.query(`SELECT * FROM certifications WHERE id = ${CertificationId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found certifications: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Certification with the id
        result({ kind: "not_found" }, null);
    });
};

CertificationSchema.getAll = result => {
    mysql.query("SELECT * FROM certifications", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("certifications: ", res);
        result(null, res);
    });
};

CertificationSchema.updateById = (id, Certification, result) => {
    mysql.query(
        "UPDATE certifications SET email = ?, name = ?, active = ? WHERE id = ?",
        [Certification.email, Certification.name, Certification.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Certification with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated certifications: ", { id: id, ...Certification });
            result(null, { id: id, ...Certification });
        }
    );
};

CertificationSchema.remove = (id, result) => {
    mysql.query("DELETE FROM certifications WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found CertificationSchema with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted certifications with id: ", id);
        result(null, res);
    });
};

CertificationSchema.removeAll = result => {
    mysql.query("DELETE FROM certifications", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} certifications`);
        result(null, res);
    });
};

module.exports = CertificationSchema;
