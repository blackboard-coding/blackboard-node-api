const express = require('express');
const router = express.Router();

const ShopSchema = require('../../../models/Account/Shop/ShopSchema');
const ApiResponseJson = require('api-response-json')

exports.on = (req, res, next) => {
    ShopSchema.find()
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
    ShopSchema.find({ _id: req.params.id })
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
                    return res.status(200).json(data)

                }
            }
        });
};

exports.created = (req, res, next) => {

    var data = new ShopSchema({
        avatar: req.body.avatar,
        name: req.body.name,
        favorite: req.body.favorite,
        vote: req.body.vote,
        comment: req.body.comment,
        lesson: req.body.lesson
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
    const data_id = ShopSchema.where({ _id: req.params.id });
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
    ShopSchema.remove({ _id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};