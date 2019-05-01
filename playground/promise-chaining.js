require('../src/db/mongoose')
const User = require('../src/models/user')


User.findByIdAndUpdate('5cc776b58ebb0f48216d03f7', { age: 25 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 25 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})