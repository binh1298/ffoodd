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

  const createAccount = (call, callback) => {
    console.log(call)
    callback(null, { message: 'CREATE_ACCOUNT', account: call.request });
  }

  const server = new grpc.Server();
  
  server.addService(account_proto.Account.service, {
    createAccount
  });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  resolve(server);
});

module.exports = Object.create({ start });
