require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5cc8caa59db6592c84f224be').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})