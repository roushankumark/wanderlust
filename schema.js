const Joi = require('joi');
// const Listing = require('./models/listing');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
    title : Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.string().required().min(0),
    country: Joi.string().required(),
    image: Joi.string().allow("", null),
}).required()
});

// module.exports.listingSchema = Joi.object({
//     listing : Joi.object({
//     title : Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     price: Joi.string().required().min(0),
//     img: Joi.string().allow("", null),
// }).required()
// });

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});