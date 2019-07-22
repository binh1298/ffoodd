'use strict';

require('dotenv').config();

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

const start = async () => {
  const account_proto = grpc.loadPackageDefinition(packageDefinition).account;

  const client = new account_proto.Account(
    process.env.SERVICE_FFOODD_ACCOUNT_SERVER_ADDRESS,
    grpc.credentials.createInsecure()
  );

  return client;
};

module.exports = Object.create({ start });
