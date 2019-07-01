const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');
const { to } = require('await-to-js');

const registerClientService = require('./grpc-clients/register.client');

const connect = ({ logger }) => () => {
  const startGRPCClient = async ({ name: CLIENT_NAME }) => {
    const PROTO_PATH = path.join(__dirname, `grpc-protos/temp/${ CLIENT_NAME }.proto`);
    const SERVICE_SERVER_ADDRESS_ENV = `SERVICE_FFOODD_${ CLIENT_NAME.toUpperCase() }_SERVER_ADDRESS`;

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
      process.env[SERVICE_SERVER_ADDRESS_ENV],
      grpc.credentials.createInsecure()
    );

    logger.info(`ACCOUNT_GRPC_SERVER: ${CLIENT_NAME} service connected`);

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

  const makeAsyncWithProxyObject = client => {
    return new Proxy({}, {
      get(target, key) {
        logger.info(`Calling to service <---- ${key}`);
        
        return options => new Promise((resolve, reject) => {
          client[key](options, (err, response) => {
            if (err) return reject(err);

            resolve(response);
          })
        });
      }
    });
  }
  
  return new Promise((resolve, reject) => {
    registerClientService.start()
      .then(registerClient => {
        const clients = {  };

        logger.info('ACCOUNT_GRPC_SERVER: retriving proto files');

        registerClient.registerServiceProtos({}, async (err, res) => {
          const { protoFiles, protoModelFiles } = res;
        
          logger.info('ACCOUNT_GRPC_SERVER: register-service-protos connected');

          if (err) return reject(err);

          for (let { name: filename, content } of protoModelFiles) {
            const [ err ] = await to(writeProtoModelFile({ filename, content }));
            if (err) return reject(err);
          }

          for (let pf of protoFiles) {
            const { name, content } = pf;
            
            const [ err0 ] = await to(writeProtoFile({ filename: name, content }));
            if (err0) return reject(err0);

            const [ err1, client ] = await to(startGRPCClient({ name }));
            if (err1) return reject(err1);

            const asyncClient = makeAsyncWithProxyObject(client);
            clients[name + 'Service'] = () => asyncClient;
          }

          resolve(clients);
        });
      });
  })
};


module.exports = Object.create({ connect });
