const axios = require('axios');
const { to } = require('await-to-js');

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

module.exports = ({ logger }) => async () => {
  const [ err, meals ] = await to(axios.get(THEMEALDB_API));
  if (err) throw err;

  return meals;
}
