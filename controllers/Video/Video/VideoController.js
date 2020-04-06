const express = require('express');
const router = express.Router();

const VideoSchema = require('../../../models/Video/Video/VideoSchema');
const ApiResponseJson = require('api-response-json')

exports.on = (req, res, next) => {
    VideoSchema.find()
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
                    return res.status(200).json({
                        total: data.length,
                        results: data
                    })
                }
            }
        });
};

exports.onId = (req, res, next) => {
    VideoSchema.find({ _id: req.params.id })
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
                        total: data.length,
                        results: data
                    })

                }
            }
        });
};

exports.created = (req, res, next) => {

    var data = new VideoSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        rate: req.body.rate,
        price: req.body.price
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
    const data_id = VideoSchema.where({ _id: req.params.id });
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
    VideoSchema.remove({ _id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};