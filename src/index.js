const express = require('express')
require('./db/mongoose')
const userRouter = require ('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// Usable when the site is under maintenance
// app.use((req, res, next) => {
//     res.status(503).send('The system is under maintenance. Please come back later.')

// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



const Task = require ('./models/task')
const User = require ('./models/user')

const main = async () => {
    // const task = await Task.findById('5cd0b951f68b450620d5385e')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5cd0b52529c8d77f19437ad1')
    await user.populate('tasks').execPopulate()
    //console.log(user.tasks)

}

main()




