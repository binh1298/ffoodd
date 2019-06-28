const PROTO_PATH = __dirname + '/../grpc-protos/meal.proto';
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const routes = require('../routes/');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = () =>
  new Promise((resolve, reject) => {
    const meal_proto = grpc.loadPackageDefinition(packageDefinition).meal;

    const server = new grpc.Server();

    server.addService(meal_proto.Meal.service, routes);

    server.bind(process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    server.start();
    resolve(server);
  });

module.exports = Object.create({ start });
