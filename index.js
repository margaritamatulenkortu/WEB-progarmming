
const express = require('express')
const app = express()
const port = 80


app.use('/static', express.static("AtminuSpele"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/', function (req, res) {
  res.send('Got a POST request')
});
