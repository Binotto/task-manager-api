const multer = require('multer')

const upload = multer ({
    dest: 'images'
})
app.post('/upload', upload.single('upload'),  (req, res) => {
    res.send()
})