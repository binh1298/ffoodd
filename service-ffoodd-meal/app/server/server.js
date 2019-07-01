const PROTO_PATH = __dirname + '/../grpc-protos/meal.proto';
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = ({ logger, serviceRoute }) => () =>
  new Promise((resolve, reject) => {
    // Override default error behaviors
    process.on('uncaughtException', err => {
      logger.error('Unhandled Exception', err);
    });

    process.on('unhandledRejection', err => {
      logger.error('Unhandled Rejection', err);
    });

    // Init grpc
    const meal_proto = grpc.loadPackageDefinition(packageDefinition).meal;

    const server = new grpc.Server();

    server.addService(meal_proto.Meal.service, serviceRoute);

    server.bind(
      process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS,
      grpc.ServerCredentials.createInsecure()
    );
    server.start();

    logger.info('gRPC Server is ready!');
    resolve(server);
  });

module.exports = Object.create({ start });
