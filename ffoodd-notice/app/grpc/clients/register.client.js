'use strict';

require('dotenv').config();

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const REGISTER_PROTO_PATH = path.join(__dirname, '/../grpc-protos/register.proto');

const packageDefinition = protoLoader.loadSync(REGISTER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = async () => {
  const RegisterProto = grpc.loadPackageDefinition(packageDefinition).register;

  const registerClient = new RegisterProto.Register(
    process.env.SERVICE_FFOODD_NOTIFICATION_SERVER_ADDRESS,
    grpc.credentials.createInsecure()
  );

  return registerClient;
};

module.exports = Object.create({ start });
