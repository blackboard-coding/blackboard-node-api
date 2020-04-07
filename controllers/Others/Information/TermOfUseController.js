const express = require('express');
const router = express.Router();

const TermOfUseSchema = require('../../../models/Others/Information/TermOfUseSchema');
const ApiResponseJson = require('api-response-json')

exports.on = (req, res, next) => {
    TermOfUseSchema.find()
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
                        "message": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat molestie erat eu volutpat. Sed volutpat at urna eu feugiat. Nulla in urna vitae libero sagittis placerat non in lacus. Phasellus lacus mauris, fringilla sit amet sem vitae, porttitor consectetur ex. Aliquam erat volutpat. Nullam sed tortor quis erat cursus tristique non interdum enim. Maecenas non nisl commodo, varius sem nec, ultricies odio. Maecenas vitae elementum enim. Integer pulvinar tortor eget purus tempus, quis maximus lorem iaculis. Aenean dictum ante in fermentum vehicula. Aenean tristique tempor eros vel sagittis. Phasellus lorem magna, aliquet vitae laoreet eu, tempus vitae sem. Maecenas et risus libero. Donec eu tristique erat. Cras vehicula metus massa, finibus pellentesque metus maximus sed.<p>Etiam condimentum nibh dui, faucibus suscipit felis euismod ac. Nullam commodo mi nibh, in condimentum massa luctus sit amet. Nulla orci velit, venenatis et massa non, tristique viverra ipsum. Vivamus eget venenatis velit, laoreet porta risus. Fusce pulvinar arcu non quam blandit, id vulputate sapien euismod. Suspendisse a lacus et magna iaculis bibendum vel tempus neque. Donec malesuada, eros id egestas tincidunt, quam diam aliquet erat, eu volutpat lacus mi fermentum diam. Morbi semper orci eu tellus finibus ultricies. Vestibulum sit amet sapien id leo consequat volutpat.</p><p>Praesent tincidunt malesuada accumsan. Cras malesuada molestie ligula, ac maximus augue elementum vel. Vestibulum turpis ex, aliquet mollis nunc eu, mattis venenatis nunc. Vestibulum auctor eros sed malesuada viverra. Donec ultrices mi lacus, sed scelerisque velit blandit vel. Phasellus elementum volutpat ante ut cursus. Nullam tincidunt neque ante, viverra ultricies libero maximus at. Aliquam faucibus suscipit elementum.</p><p>Duis sit amet dui sodales erat feugiat sollicitudin nec eget orci. Curabitur ac commodo augue. Aenean et felis quis ligula scelerisque luctus quis scelerisque leo. Vestibulum consectetur id quam vitae luctus. Aliquam erat volutpat. Morbi vulputate lacus a quam mollis, non interdum ante condimentum. Integer pellentesque urna non orci consectetur, vitae rhoncus sapien dapibus. Etiam vel leo sed metus molestie finibus in bibendum nisl. Quisque commodo dictum nisl eget venenatis. Curabitur nunc erat, semper at facilisis nec, aliquam eget nisi. Cras nec risus justo.</p><p>Nullam in venenatis justo. Quisque enim mi, cursus ut feugiat non, porttitor vel sem. Integer id velit varius, porta leo sed, volutpat nisi. In hac habitasse platea dictumst. Integer sed faucibus metus, at cursus risus. Donec elementum porta nunc eget consequat. Suspendisse non viverra augue, at finibus mauris. Vestibulum sagittis viverra odio et luctus. Maecenas quis orci malesuada, molestie nulla quis, vulputate risus. Cras in leo libero. In fermentum, nisi eget blandit faucibus, eros turpis blandit libero, et feugiat massa leo vitae velit. Fusce feugiat euismod nunc id pellentesque. Phasellus elementum commodo fermentum. Ut tincidunt justo id lorem mollis luctus. Quisque gravida facilisis est, eu imperdiet massa lacinia id.</p>"
                    })
                }
            }
        });
};

exports.onId = (req, res, next) => {
    TermOfUseSchema.find({ _id: req.params.id })
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

    var data = new TermOfUseSchema({

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
    const data_id = TermOfUseSchema.where({ _id: req.params.id });
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
    TermOfUseSchema.remove({ _id: req.params.id })
        .exec()
        .then(data => {
            ApiResponseJson.ok('Delete successfully!', res, data)
        })
        .catch(error => {
            console.log(error);
            ApiResponseJson.error(error.message, res)
        });

};