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

const start = async () => {
  const account_proto = grpc.loadPackageDefinition(packageDefinition).account;

  const server = new grpc.Server();
  
  server.addService(account_proto.Account.service, routeRoute);

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  return server;
});

module.exports = Object.create({ start });
