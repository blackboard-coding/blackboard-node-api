const express = require('express');
const router = express.Router();

const ListCommentSchema = require('../../../models/PageProduct/Product/ListCommentSchema');
const ApiResponseJson = require('api-response-json')

exports.on = (req, res, next) => {
    ListCommentSchema.find()
        .exec(function (error, data) {
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
                    // ApiResponseJson.ok('data successfully!', res, data)
                    return res.status(200).json(data)
                }
            }
        });
};

exports.onId = (req, res, next) => {
    ListCommentSchema.find({ _id: req.params.id })
        .exec(function (error, data) {
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
                        pagination: {
                            total: data.length,
                            limit: data.length,
                            offset: 0
                        },
                        result: data
                    })

                }
            }
        });
};

exports.created = (req, res, next) => {

    var data = new ListCommentSchema({
        comment: req.body.comment,
        date: req.body.date,
        cuser: req.body.cuser,
        liker: req.body.liker,
        like: req.body.like
    })
    data.save(function (error, data) {
        if (error) {
            // console.log(error);
            // ApiResponseJson.error(error.message, res);
            return res.status(400).json({
                "message": "Failed fail."
            })
        } else {
            // ApiResponseJson.created('create data successfully!', res, data);
            return res.status(201).json(data)
        }
    })
};

exports.update = (req, res, next) => {
    const data_id = ListCommentSchema.where({ _id: req.params.id });
    data_id.update(req.body)
        .exec(function (error, data) {
            if (error) {
                return next(error);
            } else {
                if (data === null) {
                    // ApiResponseJson.error(error.message, res);
                    return res.status(400).json({
                        "message": "Failed fail."
                    })
                } else {
                    // ApiResponseJson.ok('data successfully!', res, data)
                    return res.status(200).json(data)

                }
            }
        });
};

exports.remove = (req, res, next) => {
    ListCommentSchema.remove({ _id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};