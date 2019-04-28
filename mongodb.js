//CRUD create read update delete

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)

    
    //How to use updateOne with $set(Sets the value of a field in a document)
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5cc4c35cce0f0f28dd5fe2d9")
    // },{
    //     $set: {
    //         name: 'Mathew'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    //How to use updateOne with $inc(Increments the value of the field by the specified amount.).
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5cc4c35cce0f0f28dd5fe2d9")
    // },{
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //How to use updateMany with $set(Sets the value of a field in a document)
    db.collection('tasks').updateMany({
        completed: false
    },{
        $set: {
            completed: true
        }
    }).then((result) => {
        //Displays the amount of data changed
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
})