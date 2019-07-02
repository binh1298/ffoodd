module.exports = Object.create({
  connectionString: process.env.CONNECTION_STRING,
  dbName: process.env.DB_NAME || 'dev_ffoodd',
  user: process.env.DB_USER || 'ffoodd',
  password: process.env.DB_PASS || 'ffoodd',
  attributes: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
  }
})