
const express = require('express')
const app = express()
const port = 80

var fs = require('fs') // this engine requires the fs module
const buttons = fs.readFileSync('AtminuSpele/etbuttons.html').toString();
const footer = fs.readFileSync('AtminuSpele/efooter.html').toString();
const header = fs.readFileSync('AtminuSpele/eheader.html').toString();
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  console.log('hello', filePath)
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
    var rendered = content.toString()
    .replace('#buttons#', buttons)
    .replace('#header#', header)
    .replace('#footer#', footer);
    return callback(null, rendered)
  })
})
app.set('AtminuSpele', './AtminuSpele') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.use('/static', express.static("AtminuSpele"));
//
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!' })
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/Pamaciba.ntl', function (req, res) {
  res.render('Pamaciba', {})
});

app.get('/index.ntl', function (req, res) {
  res.render('index', {});
});
app.get('/galerija.ntl', function (req, res) {
  res.render('galerija', {});
});
app.get('/parprojektu.ntl', function (req, res) {
  res.render('parprojektu', {});
});
app.get('/rekordi.ntl', function (req, res) {
  res.render('rekordi', {});
});
app.get('/terminukratuve.ntl', function (req, res) {
  res.render('terminukratuve', {});
});
