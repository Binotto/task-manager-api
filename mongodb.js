//CRUD create read update delete

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)

    //How to use deleteMany
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //How to use deleteOne
    db.collection('tasks').deleteOne({
        description : "ask for an IFood",
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})