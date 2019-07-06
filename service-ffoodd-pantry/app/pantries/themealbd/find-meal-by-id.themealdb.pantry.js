const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

module.exports = ({ logger }) => async ({ id }) => {
  const [ err, res ] = await to(axios.get(THEMEALDB_API, {
    params: {
      i: id
    }
  }));
  if (err) throw err;

  const { meals } = res.data;
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

  logger.info(`Creating new ffoodd meal: ${ffooddMeal.name}`);

  return meal;
}
