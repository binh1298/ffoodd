module.exports = Object.create({
    initialize: container => {
        const { db: connection } = container.cradle;

        return new Promise((resolve, reject) => {
            if (!connection) {
                reject(new Error('connection is required'))
            }

            resolve({
                Account: require('./account.repository')(container)
            });
        })
    },
})
