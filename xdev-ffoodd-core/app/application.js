const {database} = require('../config/');
const Account = require('./models/account.model');
// const Meal = require('./models/meal.model');
// const Category = require('./models/category.model');
database.connect().then((result) => {
  const test = new Account({
    lastname: 'Pham',
    firstname: 'Binh',
    email: 'binh1298@gmail.com',
    password: '123123',
    username: 'binh1298'
  })
  test.save();
}).catch((err) => {
  console.log(err);
});


