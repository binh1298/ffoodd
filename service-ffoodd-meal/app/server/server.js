const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const path = require('path');
const fs = require('fs');

const MEAL_PROTO_PATH = path.join(__dirname, '/../grpc-protos/meal.proto');
const CATEGORY_PROTO_PATH = path.join(__dirname, '/../grpc-protos/category.proto');
const REVIEW_PROTO_PATH = path.join(__dirname, '/../grpc-protos/review.proto');
const REGISTER_PROTO_PATH = path.join(__dirname + '/../grpc-protos/register.proto');

const packageDefinitionOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const mealPackageDefinition = protoLoader.loadSync(MEAL_PROTO_PATH, packageDefinitionOptions);
const categoryPackageDefinition = protoLoader.loadSync(CATEGORY_PROTO_PATH, packageDefinitionOptions);
const reviewPackageDefinition = protoLoader.loadSync(REVIEW_PROTO_PATH, packageDefinitionOptions);
const registerPackageDefinition = protoLoader.loadSync(REGISTER_PROTO_PATH, packageDefinitionOptions);

const start = ({ logger, mealRoute, categoryRoute, reviewRoute }) => () =>
  new Promise((resolve, reject) => {
    // Override default error behaviors
    process.on('uncaughtException', err => {
      logger.error('Unhandled Exception', err);
    });

    process.on('unhandledRejection', err => {
      logger.error('Unhandled Rejection', err);
    });

    const registerServiceProtos = async (call, callback) => {
      logger.info('Sending proto files -----> client', call);

      const mealProtoFile = {
        name: 'meal',
        content: fs.readFileSync(MEAL_PROTO_PATH, { encoding: 'utf-8' })
      };

      const mealModelFile = {
        name: 'meal',
        content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/meal.model.proto'))
      };

      //////////////////////////////////////////////////////

      const categoryProtoFile = {
        name: 'category',
        content: fs.readFileSync(CATEGORY_PROTO_PATH, { encoding: 'utf-8' })
      };

      const categoryModelFile = {
        name: 'category',
        content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/category.model.proto'))
      };

      ///////////////////////////////////////////////////////

      const reviewProtoFile = {
        name: 'review',
        content: fs.readFileSync(REVIEW_PROTO_PATH, { encoding: 'utf-8' })
      };

      const reviewModelFile = {
        name: 'review',
        content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/review.model.proto'))
      };

      ///////////////////////////////////////////////////////

      const recipeModelFile = {
        name: 'recipe',
        content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/recipe.model.proto'))
      };

      const ingredientModelFile = {
        name: 'ingredient',
        content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/ingredient.model.proto'))
      };

      callback(null, {
        protoFiles: [mealProtoFile, categoryProtoFile, reviewProtoFile],
        protoModelFiles: [mealModelFile, categoryModelFile, reviewModelFile, recipeModelFile, ingredientModelFile]
      });
    };

    // Init grpc
    const MealProto = grpc.loadPackageDefinition(mealPackageDefinition).meal;
    const CategoryProto = grpc.loadPackageDefinition(categoryPackageDefinition).category;
    const ReviewProto = grpc.loadPackageDefinition(reviewPackageDefinition).review;
    const RegisterProto = grpc.loadPackageDefinition(registerPackageDefinition).register;

    const server = new grpc.Server();

    server.addService(MealProto.Meal.service, mealRoute);
    server.addService(CategoryProto.Category.service, categoryRoute);
    server.addService(ReviewProto.Review.service, reviewRoute);
    server.addService(RegisterProto.Register.service, { registerServiceProtos });

    server.bind(process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    server.start();

    logger.info('gRPC Server is ready!');
    resolve(server);
  });

module.exports = Object.create({ start });
