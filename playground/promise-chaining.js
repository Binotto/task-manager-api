require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('5cc776b58ebb0f48216d03f7', { age: 25 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 25 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5cc776b58ebb0f48216d03f7', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})