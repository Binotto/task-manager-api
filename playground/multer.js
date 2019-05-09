const multer = require('multer')


//Third example
// const upload = multer ({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         //match() allows regular expressions to be tested    
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('File must a Word document.'))
//         }
        
//         cb(undefined, true)
//     }
// })


//Second example
// const upload = multer ({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.endsWith('.pdf')) {
//             return cb(new Error('File must a PDF.'))
//         }
        
//         cb(undefined, true)
//     }
// })


// First example
const upload = multer ({
    dest: 'images',
    limits: {
        fileSize: 1000000
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({ error: error.message })
})