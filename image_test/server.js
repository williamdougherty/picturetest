const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('myImage');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) =>{
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        }
        else{
            if(req.file == undefined){
                res.render('index', {
                    msg: 'Error: No File Selected'
                });
            }
            else{
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    })
});

const port = 3000;
app.listen(port, () => console.log(`port: ${port}`));

