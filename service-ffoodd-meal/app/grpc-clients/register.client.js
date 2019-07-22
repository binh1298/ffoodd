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
  const registerProto = grpc.loadPackageDefinition(packageDefinition).register;

  const registerClient = new registerProto.Register(
    process.env.SERVICE_FFOODD_MEAL_SERVER_ADDRESS,
    grpc.credentials.createInsecure()
  );

  return registerClient;
};

module.exports = Object.create({ start });
