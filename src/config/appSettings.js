module.exports.Settings = {
    db: {
        //path: 'C:\Users\talas\Desktop\bettingLeague\db\neymar.sqlite',
        path: './db/neymar.sqlite',
        databaseName: 'neymar.sqlite',
        username: '',
        password: '',
        host: 'localhost',
        port: 3000,
        dialect: 'sqlite',
        logging: console.log,
        typeValidation: true,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        //storage: 'C:\Users\talas\Desktop\bettingLeague\db\neymar.sqlite'
    },
    connection: {
        port: 3000
    },
    initializationDone: false
}