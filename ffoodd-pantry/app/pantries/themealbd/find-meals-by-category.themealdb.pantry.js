const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

module.exports = ({ logger }) => async ({ categoryName }) => {
  const [ err, res ] = await to(axios.get(THEMEALDB_API, {
    params: {
      c: categoryName
    }
  }));
  if (err) throw err;

  return res.data.meals;
}
