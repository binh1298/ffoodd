const spdy = require('spdy');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const appRoot = require('app-root-path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const rootRoute = require('../routes');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';

const start = container => {
  return new Promise((resolve, reject) => {
    const { port, ssl } = container.resolve('serverConfigs');
    const logger = container.resolve('logger');
    // const { requestMiddleware } = container.resolve('middlewares');
    
    if (!port)
        reject(new Error('port is require'));

    const app = express();

    if (process.env.NODE_ENV === 'production')
        morganFormat = 'combined';

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(helmet());
    app.use(morgan(morganFormat, { stream: logger.stream}));

    app.use(cookieParser());

    // app.use(requestMiddleware.wirePreRequest);
    
    app.use('/api', rootRoute(container));

    // app.use(requestMiddleware.wirePostRequest);

    // app.use(requestMiddleware.wireNotFoundMiddleware);

    if (process.env.NODE === 'test') {
        const server = app.listen(port, () => resolve(server))
    } else {
        const server = spdy.createServer(ssl, app)
            .listen(port, () => resolve(server));
    }
  })
}

module.exports = Object.create({ start })
