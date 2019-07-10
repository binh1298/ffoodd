require('dotenv').config();

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const path = require('path');

const MEAL_PROTO_PATH = path.join(__dirname, '/../grpc-protos/meal.proto');
const CATEGORY_PROTO_PATH = path.join(__dirname, '/../grpc-protos/category.proto');

const packageDefinitionOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const mealPackageDefinition = protoLoader.loadSync(MEAL_PROTO_PATH, packageDefinitionOptions);
const categoryPackageDefinition = protoLoader.loadSync(CATEGORY_PROTO_PATH, packageDefinitionOptions);

const start = () =>
  new Promise((resolve, reject) => {
    const MealProto = grpc.loadPackageDefinition(mealPackageDefinition).meal;
    const CategoryProto = grpc.loadPackageDefinition(categoryPackageDefinition).category;

    const mealClient = new MealProto.Meal(
      process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS,
      grpc.credentials.createInsecure()
    );

    const categoryClient = new CategoryProto.Category(
      process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS,
      grpc.credentials.createInsecure()
    );
    resolve({ mealClient, categoryClient });
  });

module.exports = Object.create({ start });
