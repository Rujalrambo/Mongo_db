const {MongoClient} = require('mongodb')
// const dotenv = require('dotenv')

// dotenv.config()

let dbConnection

const uri = 'mongodb+srv://rujalshrsth:masterrujal@cluster0.7ra0dql.mongodb.net/?retryWrites=true&w=majority';



module.exports ={
    connectToDb: (cb) =>{ // cb is callback function
        MongoClient.connect(uri)
        .then((client)=>{
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)// callbcak function
        })
    },
    //         MongoClient.client(uri);
    //         .then((client) => {
    //         dbConnection = client.db();            
    //         console.log('Connected to MongoDB')} 
    //         .catch (err =>  {
    //         console.error('Error connecting to MongoDB:', err);
    getDb: () => dbConnection
}