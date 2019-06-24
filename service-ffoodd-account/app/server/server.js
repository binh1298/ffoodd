const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../grpc-protos/account.proto';
const routeRoute = require('../routes/');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = ({ logger }) => () => new Promise((resolve, reject) => {
  const account_proto = grpc.loadPackageDefinition(packageDefinition).account;

  const server = new grpc.Server();
  
  server.addService(account_proto.Account.service, routeRoute);

  server.bind(process.env.SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
  server.start();
  logger.info(`gRPC SERVER IS READY`);
  resolve(server);
});

module.exports = Object.create({ start });
