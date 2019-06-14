module.exports = Object.create({
    dbName: process.env.DB_NAME || 'dev_nodejs-microservices',
    user: process.env.DB_USER || 'qpham',
    password: process.env.DB_PASS || 'qpham',
    servers: process.env.DB_SERVERS ? process.env.DB_SERVERS.split(' ') : [
            '192.168.99.100:27017',
            '192.168.99.101:27017',
            '192.168.99.102:27017'
    ]
})