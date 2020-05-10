const express = require('express');
const router = express.Router();

const MainMenuCategorieSchema = require('../../../models/Categorie/MainMenuCategorie/MainMenuCategorieSchema');
const ApiResponseJson = require('api-response-json')


exports.on = (req, res, next) => {
    MainMenuCategorieSchema.getAll(function (error, data) {
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
    MainMenuCategorieSchema.findById(req.params.id, (error, data) => {
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

exports.created = (req, res, next) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var customer = new MainMenuCategorieSchema({
        title: req.body.title,
        icon: req.body.icon,
        url: req.body.url
    });

    MainMenuCategorieSchema.create(customer, function (error, data) {
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
    const data_id = MainMenuCategorieSchema.where({ _id: req.params.id });
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
    MainMenuCategorieSchema.remove({ _id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};