const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../grpc-protos/meal.proto';

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

    const client = new meal_proto.Meal(
      process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS,
      grpc.credentials.createInsecure()
     );

    resolve(client);
  });

module.exports = Object.create({ start });
