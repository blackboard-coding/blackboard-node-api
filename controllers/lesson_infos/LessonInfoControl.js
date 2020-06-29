const express = require('express');
const router = express.Router();

const LessonInfoSchema = require('../../models/lesson_infos/LessonInfoSchema');
const ApiResponseJson = require('api-response-json')

exports.on = (req, res, next) => {
    LessonInfoSchema.getAll(function (error, data) {
        if (error) {
            // return next(error);
            // return res.status(400).json({
            //     "message": "Failed fail."
            //   })
            return res.status(500).send({
                message: error.message || "Some error occurred while retrieving customers."
            });
        } else {
            if (data === null) {
                // ApiResponseJson.error(error.message, res);

            } else {
                // ApiResponseJson.ok('data successfully!', res, data)
                return res.status(200).json({
                    total: data.length,
                    version: "20200212235959",
                    results: data
                })
            }
        }
    })

};

exports.onId = (req, res, next) => {
    LessonInfoSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
            // return res.status(400).json({
            //     "message": "Failed fail."
            //   })
        } else {
            if (data === null) {
                // ApiResponseJson.error(error.message, res);
                return res.status(400).json({
                    "message": "Failed fail."
                })
            } else {
                // ApiResponseJson.ok('HomeSlide successfully!', res, data)
                return res.status(200).json({
                    total: data.length,
                    version: "20200212235959",
                    results: data
                })

            }
        }
    })
};


exports.onStatus = (req, res, next) => {
    LessonInfoSchema.findByNotAllowVideo(req.params.status, function (error, data) {
        if (error) {
            // return next(error);
            // return res.status(400).json({
            //     "message": "Failed fail."
            //   })
            return res.status(500).send({
                message: error.message || "Some error occurred while retrieving customers."
            });
        } else {
            if (data === null) {
                // ApiResponseJson.error(error.message, res);
                return res.status(400).json({
                    "message": "Failed fail."
                })
            } else {
                // ApiResponseJson.ok('data successfully!', res, data)
                return res.status(200).json({
                    total: data.length,
                    version: "20200212235959",
                    results: data
                })
            }
        }
    })

};

exports.created = (req, res, next) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var customer = new LessonInfoSchema({
        title: LessonInfo.title,
        note: LessonInfo.note,
        type: LessonInfo.type,
        tag: LessonInfo.tag,
        cover: LessonInfo.cover,
        price: LessonInfo.price,
        net: LessonInfo.net,
        active: LessonInfo.active,
        duration: LessonInfo.duration,
        status: LessonInfo.status,
    });

    LessonInfoSchema.create(customer, function (error, data) {
        if (error) {
            // console.log(error);
            // ApiResponseJson.error(error.message, res);
            // return res.status(500).json({
            //     "message": "Failed fail."
            // })
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Customer."
            });
        } else {
            // ApiResponseJson.created('create data successfully!', res, data);
            return res.status(201).json(data)
        }
    })
};

exports.update = (req, res, next) => {
    LessonInfoSchema.updateById(req.params.id, new LessonInfoSchema(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    })
};

exports.updateStatus = (req, res, next) => {
    // console.log(req.body);
    // const data_id = LessonInfoSchema.where({ id: req.params.id })


    LessonInfoSchema.updateByStatusVideo(req.params.id, new LessonInfoSchema(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    })

};

exports.remove = (req, res, next) => {
    LessonInfoSchema.remove({ id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};