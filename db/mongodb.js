const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const url = 'mongodb://mongo:27017'
const databaseName = 'task-manager'


const connectDB = (callback)=>{

    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, (error,client)=>{
        if(error)
        {
            return callback("Couldn't connect to database. Error: "+error)
        }
        const db = client.db(databaseName)
        
        dbName = db.s.namespace.db
        console.log("Connected to db -> "+dbName)
        callback(db)
    })
}   


module.exports = connectDB