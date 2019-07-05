const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';

module.exports = ({ logger }) => async () => {
  const [ err, categories ] = await to(axios.get(THEMEALDB_API));
  if (err) throw err;
  if (!categories) return null; 

  for (category of categories) {
    const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = category;
    const ffooddCategory = {
      name: strCategory,
      description: strCategoryDescription,
      imageUrl: strCategoryThumb
    };

    logger.info(`Creating new ffoodd category: ${ffooddCategory.name}`);
  }

  return categories;
}
