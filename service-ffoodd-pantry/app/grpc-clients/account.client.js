const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../grpc-protos/account.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = () => new Promise((resolve, reject) => {
  const account_proto = grpc.loadPackageDefinition(packageDefinition).account;

  const client = new account_proto.Account('localhost:50051', grpc.credentials.createInsecure());

  resolve(client);
});

module.exports = Object.create({ start });
