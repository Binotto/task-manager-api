// Usable when the site is under maintenance
//FirstExample
// app.use((req, res, next) => {
//     if (req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })
//Secoond Example
// app.use((req, res, next) => {
//     res.status(503).send('The system is under maintenance. Please come back later.')

// })