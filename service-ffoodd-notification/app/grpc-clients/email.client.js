'use strict';

require('dotenv').config();

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname + '/../grpc-protos/email.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const start = async () => {
  const EmailProto = grpc.loadPackageDefinition(packageDefinition).email;

  const emailClient = new EmailProto.Email(
    process.env.SERVICE_FFOODD_NOTIFICATION_SERVER_ADDRESS,
    grpc.credentials.createInsecure()
  );

  return emailClient;
};

module.exports = Object.create({ start });
