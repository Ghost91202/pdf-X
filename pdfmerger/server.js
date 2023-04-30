const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});
const {
    log
} = require('console');
const express = require('express');
const {
    mergePdf
} = require('./merge');

const {
    request
} = require('http');
const path = require('path');
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/index.html'));
});
app.post('/merge', upload.array('pdfS', 2), async function(req, res, next) {
    console.log(req.files);
    let d = await mergePdf(
        path.join(__dirname, req.files[0].path),
        path.join(__dirname, req.files[1].path)
    );
    // res.send({ data: req.files });
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
});
// app.post('/', (req, res) => {
// res.sendFile(path.join(__dirname, 'template/index.html'));
// });

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});