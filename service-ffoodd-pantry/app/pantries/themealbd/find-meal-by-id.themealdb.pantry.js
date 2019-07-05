const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';

module.exports = ({ logger }) => async () => {
  const [ err, meals ] = await to(axios.get(THEMEALDB_API));
  if (err) throw err;
  if (!meals) return null;

  const meal = meals[0];
  const {
    idMeal,
    strMeal,
    strDrinkAlternate,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
    strSource,
    dateModified,
  } = meal;

  const tags = strTags.split(',');

  const ingredients = Array.from({ length: 20 }).map((v, i) => ({
    ingredient: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`]
  }));

  const ffooddMeal = {
    themealdb_id: idMeal,
    name: strMeal,
    origin: strArea,
    images: [
      strMealThumb
    ],
    recipe: {
      instruction: strInstructions,
      ingredients: ingredients
    }
  };

  return meal;
}
