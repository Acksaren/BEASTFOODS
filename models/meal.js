const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    Title: {type: String, required: true},
    whatIsIncluded: {type: String, required: true},
    Description: {type: String, required: true},
    Category: {type: String, required: true},
    Price: {type: Schema.Types.Decimal128, required: true},
    cookingTime: {type: String, required: true},
    Servings: {type: Number, required: true},
    calorieCount: {type: Number, required: true},
    topMeal: {type: Boolean, default: false},
    imageURL: {type: String, required: true}
});

module.exports = model('Meal', schema);