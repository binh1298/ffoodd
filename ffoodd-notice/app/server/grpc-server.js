const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');

const EMAIL_PROTO_PATH = path.join(__dirname + '/../grpc/protos/email.proto');
const REGISTER_PROTO_PATH = path.join(__dirname + '/../grpc/protos/register.proto');

const packageDefinitionOptions =  {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const emailPackageDefinition = protoLoader.loadSync(EMAIL_PROTO_PATH, packageDefinitionOptions);
const registerPackageDefinition = protoLoader.loadSync(REGISTER_PROTO_PATH, packageDefinitionOptions);

const start = ({ logger, emailGRPCRoute }) => async () => {
  process.on('uncaughtException', err => {
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });

  const registerServiceProtos = async (call, callback) => {
    logger.info('Sending proto files -----> client', call);

    const emailProtoFile = {
      name: 'email',
      content: fs.readFileSync(EMAIL_PROTO_PATH, { encoding: 'utf-8' })
    };

    const emailModelFile = {
      name: 'email',
      content: fs.readFileSync(path.join(__dirname, '/../grpc-protos/models/email.model.proto'))
    }

    callback(null, {
      protoFiles: [ emailProtoFile ],
      protoModelFiles: [ emailModelFile ]
    });
  }

  const EmailProto = grpc.loadPackageDefinition(emailPackageDefinition).email;
  const RegisterProto = grpc.loadPackageDefinition(registerPackageDefinition).register;

  const server = new grpc.Server();

  server.addService(EmailProto.Email.service, emailGRPCRoute);
  server.addService(RegisterProto.Register.service, { registerServiceProtos });

  server.bind(process.env.SERVICE_FFOODD_NOTIFICATION_SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
  server.start();
  logger.info(`gRPC SERVER IS READY`);
  return server;
};

module.exports = Object.create({ start });
