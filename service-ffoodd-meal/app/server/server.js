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

const start = ({ logger, mealRoute, categoryRoute }) => () =>
  new Promise((resolve, reject) => {
    // Override default error behaviors
    process.on('uncaughtException', err => {
      logger.error('Unhandled Exception', err);
    });

    process.on('unhandledRejection', err => {
      logger.error('Unhandled Rejection', err);
    });

    // Init grpc
    const MealProto = grpc.loadPackageDefinition(mealPackageDefinition).meal;
    const CategoryProto = grpc.loadPackageDefinition(categoryPackageDefinition).category;

    const server = new grpc.Server();

    server.addService(MealProto.Meal.service, mealRoute);
    server.addService(CategoryProto.Category.service, categoryRoute);

    server.bind(process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    server.start();

    logger.info('gRPC Server is ready!');
    resolve(server);
  });

module.exports = Object.create({ start });
