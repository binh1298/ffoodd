'use strict';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');
const { to } = require('await-to-js');

const registerClientService = require('./grpc-clients/register.client');

const connect = ({ logger }) => async () => {
  const startGRPCClient = async ({ CLIENT_NAME, SERVER_ADDRESS }) => {
    const PROTO_PATH = path.join(__dirname, `grpc-protos/temp/${ CLIENT_NAME }.proto`);

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

    const serviceProto = grpc.loadPackageDefinition(packageDefinition)[ CLIENT_NAME ];
    const ServiceConstructor = serviceProto[ CLIENT_NAME[0].toUpperCase() + CLIENT_NAME.slice(1) ];

    const client = new ServiceConstructor(
      SERVER_ADDRESS,
      grpc.credentials.createInsecure()
    );

    return client;
  };

  const writeProtoModelFile = ({ filename, content }) => new Promise((resolve, reject) => {
    const FILE_PATH = path.join(__dirname, 'grpc-protos/temp/models');

    fs.mkdir(FILE_PATH, { recursive: true }, err => {
      if (err) reject(err);

      fs.writeFileSync(`${FILE_PATH}/${filename}.model.proto`, content);
      resolve();
    })
  })

  const writeProtoFile = ({ filename, content }) => new Promise((resolve, reject) => {
    const FILE_PATH = path.join(__dirname, 'grpc-protos/temp');

    fs.mkdir(FILE_PATH, { recursive: true }, err => {
      if (err) reject(err);

      fs.writeFileSync(`${FILE_PATH}/${filename}.proto`, content);
      resolve();
    })
  })

  const makeAsyncWithProxyObject = ({ client, SERVER_NAME }) => {
    return new Proxy({}, {
      get(target, key) {
        logger.info(`${SERVER_NAME}: Calling to procedure <---- ${key}`);

        return options => new Promise((resolve, reject) => {
          if (!(key in client))
            return reject(new Error('Method not found in services'));

          client[key](options, (err, response) => {
            if (err) return reject(err);

            resolve(response);
          })
        });
      }
    });
  }

  const connectToGRPCServer = (SERVER_NAME, SERVER_ADDRESS) => new Promise((resolve, reject) => {
    registerClientService.start(SERVER_ADDRESS)
      .then(registerClient => {
        const gRPCClientService = {};

        registerClient.registerServiceProtos({}, async (err, res) => {
          if (err) {
            logger.warn(`${SERVER_NAME}: Can not connect to gRPC-server`, err);

            return resolve(new Proxy({}, {
              get() {
                return new Proxy({}, {
                  get: () => async () => { throw new Error(`${SERVER_NAME}: gRPC-server have not been connected`) }
                });
              }
            }));
          }

          const { protoFiles, protoModelFiles } = res;

          logger.info(`${SERVER_NAME}: retriving proto files`);

          for (let { name: filename, content } of protoModelFiles) {
            const [ err ] = await to(writeProtoModelFile({ filename, content }));
            if (err) return reject(err);
          }

          for (let pf of protoFiles) {
            const { name, content } = pf;

            const [ err0 ] = await to(writeProtoFile({ filename: name, content }));
            if (err0) return reject(err0);

            const [ err1, client ] = await to(startGRPCClient({ CLIENT_NAME: name, SERVER_ADDRESS }));
            if (err1) {
              logger.error(`Error while connecting gRPCClient: ${name}`);
              logger.error(err1.message);
              logger.error(err1.stack);
            }

            logger.info(`${SERVER_NAME}: ${name}-service connected`);

            gRPCClientService[name] = makeAsyncWithProxyObject({ client, SERVER_NAME });
          }

          resolve(gRPCClientService);
        });
      });
  })

  return {  };
};


module.exports = Object.create({ connect });
