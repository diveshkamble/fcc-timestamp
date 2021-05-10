// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

const date_regex = new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))');
const unix_epoch_regex = new RegExp('^([(0-9]{13})$');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?',(req,res)=>{

  let date = req.params.date;

  if (!date){
    date = new Date().getTime();
    
  }

if (date_regex.test(date)){

res.json({unix:new Date(date).getTime(),utc:new Date(date).toUTCString()})
  }
else if(unix_epoch_regex.test(date))
{
  
res.json({unix:new Date(date*1).getTime(),utc:new Date(date*1).toUTCString()})
}
else
{
 res.json({error:"Invalid Date"})
}
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});
