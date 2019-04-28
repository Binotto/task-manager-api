//CRUD create read update delete

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID('5cc4bbf5eeebf6235b6d2d36') }, (error, user) => {
    //     if (error){
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 25 }).toArray((error, users) =>{
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 25 }).count((error, count) =>{
    //     console.log(count)
    // })

    db.collection('tasks').findOne({ _id: new ObjectID('5cc4d24324a9f32f29f2ffe7') },(error, task) => {
        console.log('The last task added.')
        console.log(task)
    } )

    db.collection('tasks').find( {completed: false} ).toArray((error, tasks) => {
        console.log('All tasks that have not been completed.')
        console.log(tasks)
    })
})