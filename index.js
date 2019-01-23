
const express = require('express')
const app = express()
const port = 8081;

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
      .replace('#footer#', footer)
      .replace("visirekordi#", options.visirekordi);
    return callback(null, rendered)
  })
})
app.set('AtminuSpele', './AtminuSpele') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.use('/static', express.static("AtminuSpele"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', function (req, res) {
  res.render('index', {});
});

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
  rekordi.find({}).toArray(function(err, visirekordi) {
    function compare(a,b) {
      if (a.laiks < b.laiks)
        return 1;
      if (a.laiks > b.laiks)
        return -1;
      return 0;
    }

    visirekordi.sort(compare);

    console.log(visirekordi);
    var teksts = "";
    for(var i = 0; i < visirekordi.length; i++) {
      var vieta = i + 1;
      teksts = teksts + "<tr align=\"center\" ><td>"+ vieta +"</td> <td>" + visirekordi[i].vards +
        "</td><td> Uzvards </td><td>" + Math.round(Number(visirekordi[i].laiks) / 1000) + " sekundes</td></tr>"
    }

    res.render('rekordi', {
      visirekordi: teksts
    });
  });

});
app.get('/terminukratuve.ntl', function (req, res) {
  res.render('terminukratuve', {});
});

app.get('/sanemtRekordu', function(req, res) {
  var vards = req.query.vards;
  var laiks = req.query.laiks;

  rekordi.insert({
    vards: vards,
    laiks: laiks
  });

  console.log(req.query);
  res.send();
});


var MongoClient = require('mongodb').MongoClient;
var rekordi;
var uri = "mongodb://Margarita:Parole123@web-programming-shard-00-00-1sesu.mongodb.net:27017,web-programming-shard-00-01-1sesu.mongodb.net:27017,web-programming-shard-00-02-1sesu.mongodb.net:27017/test?ssl=true&replicaSet=WEB-Programming-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, function(err, client) {
  rekordi = client.db("WEB-Programming").collection("rekordi");
});
