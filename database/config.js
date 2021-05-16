const mongoose = require('mongoose');


const dbConnection = async() => {
    
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (e) {
        console.log(e);
        throw new Error('Error al iniciar la conexión con MONGODB_CNN')
    }

}

module.exports = {
    dbConnection,
}