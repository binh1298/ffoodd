const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';

module.exports = ({ logger, mealGRPCClientService }) => {
  const Category = mealGRPCClientService.category;

  const findAllCategories = async () => {
    const [ err, res ] = await to(axios.get(THEMEALDB_API));
    if (err) throw err;

    const { categories } = res.data;
    if (!categories) return null; 

    for (category of categories) {
      const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = category;
      const ffooddCategory = {
        name: strCategory,
        description: strCategoryDescription,
        imageUrl: strCategoryThumb
      };

      Category.create({ category: ffooddCategory });

      logger.info(`Creating new ffoodd category: ${ffooddCategory.name}`);
    }

    return categories;
  }

  return findAllCategories;
}
