const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const ACCOUNT_PROTO_PATH = path.join(__dirname + '/../grpc-protos/account.proto');

const packageDefinition = protoLoader.loadSync(ACCOUNT_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = ({ logger, rootRoute }) => async () => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });

  const account_proto = grpc.loadPackageDefinition(packageDefinition).account;

  const server = new grpc.Server();
  
  server.addService(account_proto.Account.service, rootRoute);

  server.bind(process.env.SERVICE_FFOODD_ACCOUNT_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
  server.start();
  logger.info(`gRPC SERVER IS READY`);
  return server;
};

module.exports = Object.create({ start });
