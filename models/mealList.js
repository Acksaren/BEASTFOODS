const meal = require("../models/meal");

var mealKit = [
  {
    Title: "Tofu Fried Rice.",
    whatIsIncluded: "Tofu, Rice, Beans and Spices.",
    Description: "Easy to Prepare!",
    Category: "Vegetarian Meals",
    Price: 11.99,
    cookingTime: "20 minutes",
    Servings: "3",
    calorieCount: "650",
    imageURL: "/images/Vegetable-fried-rice-500x500.jpg",
    topMeal: true,
  },
  {
    Title: "Stir Fry Beef and Broccoli.",
    whatIsIncluded: "Beef, Broccoli and Vegetables",
    Description: "Mouthwatering Meal!",
    Category: "Meat Meals",
    Price: 10.99,
    cookingTime: "45 minutes",
    Servings: "4",
    calorieCount: "3050",
    imageURL: "/images/Beef-and-Broccoli-Stir-Fry-3-500x500.jpg",
    topMeal: true,
  },
  {
    Title: "OG Wings",
    whatIsIncluded: "Chicken Wings and Spicy Meat Seasoning.",
    Description: "Spicy and Flavourful!",
    Category: "Meat Meals",
    Price: 19.99,
    cookingTime: "30 minutes",
    Servings: "2",
    calorieCount: "425",
    imageURL: "/images/wings.jpg",
    topMeal: true,
  },
  {
    Title: "Mexican Chicken Bowl.",
    whatIsIncluded: "Chicken, Spices and Vegetables,",
    Description: "Simple Lunch Bowl!",
    Category: "Meat Meals",
    Price: 12.99,
    cookingTime: "25 minutes",
    Servings: "1",
    calorieCount: "330",
    imageURL: "/images/bowls.jpg",
    topMeal: true,
  },
  {
    Title: "Vegetable Soup",
    whatIsIncluded: "Vegetables, Herbs, Spices and Stock.",
    Description: "Healthy and Delicious!",
    Category: "Vegetarian Meals",
    Price: 8.99,
    cookingTime: "15 minutes",
    Servings: "6",
    calorieCount: "220",
    imageURL: "/images/vegetable-soup.jpg",
    topMeal: false,
  },
  {
    Title: "Filet Mignon Recipe",
    whatIsIncluded: "2 Filet Mignon, Mushrooms and Seasoning.",
    Description: "Fancy and Healthy Meal!",
    Category: "Meat Meals",
    Price: 24.99,
    cookingTime: "45 minutes",
    Servings: "2",
    calorieCount: "733",
    imageURL: "/images/Mignon.jpg",
    topMeal: false,
  },
];

module.exports.getAllMeals = function () {
  return mealKit; 
};

module.exports.vegetarianMeals = function () {
  let filtered = mealKit.filter((item) => {
    return item.Category === "Vegetarian Meals";
  });

  return filtered;
};

module.exports.meatMeals = function () {
  let filtered = mealKit.filter((item) => {
    return item.Category === "Meat Meals";
  });
  return filtered;
};

module.exports.getTopMeal = function () {
  let filtered = mealKit.filter((item) => {
    console.log(item);
    return item.topMeal === true;
  });

  return filtered;
};

module.exports.onMenu = async function () {
  return await meal.aggregate([
		{
			$group: {
				_id: '$Category',
				meals: {
					$push: {
						imageURL: '$imageURL', 
						Title: '$Title', 
						whatIsIncluded: '$whatIsIncluded',
						Description: '$Description',
						Price: '$Price',
						id: '$_id'
					}
				}
			}
		}
	]);
}

module.exports.topMeals = async function () {
  let meals = await meal.find({topMeal: true});
  return meals.map(meal => meal.toJSON());
}
