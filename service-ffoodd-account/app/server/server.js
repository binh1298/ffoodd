const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');

const ACCOUNT_PROTO_PATH = path.join(__dirname + '/../grpc-protos/account.proto');
const REGISTER_PROTO_PATH = path.join(__dirname + '/../grpc-protos/register.proto');

const packageDefinitionOptions =  {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const accountPackageDefinition = protoLoader.loadSync(ACCOUNT_PROTO_PATH, packageDefinitionOptions);
const registerPackageDefinition = protoLoader.loadSync(REGISTER_PROTO_PATH, packageDefinitionOptions);

const start = ({ logger, rootRoute }) => async () => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });

  const registerServiceProtos = async (call, callback) => {
    logger.info('Sending proto files -----> client', call);

    const accountProtoFile = {
      name: 'account',
      content: fs.readFileSync(ACCOUNT_PROTO_PATH, { encoding: 'utf-8' })
    };

    callback(null, { protoFiles: [ accountProtoFile ] });
  }


  const AccountProto = grpc.loadPackageDefinition(accountPackageDefinition).account;
  const RegisterProto = grpc.loadPackageDefinition(registerPackageDefinition).register;

  const server = new grpc.Server();
  
  server.addService(AccountProto.Account.service, rootRoute);
  server.addService(RegisterProto.Register.service, { registerServiceProtos });

  server.bind(process.env.SERVICE_FFOODD_ACCOUNT_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
  server.start();
  logger.info(`gRPC SERVER IS READY`);
  return server;
};

module.exports = Object.create({ start });
