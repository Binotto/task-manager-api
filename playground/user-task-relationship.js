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