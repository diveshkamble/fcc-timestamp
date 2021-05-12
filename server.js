// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

let date_regex = new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))');
let unix_epoch_regex = new RegExp('([0-9]{13})');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.status(200).json({greeting: 'hello API'});
});

app.get('/api/:date?',(req,res)=>{

  let date = req.params.date;

  if (!date){
    date = new Date().getTime();
  }


if (date_regex.test(date)){  
  console.log("Here 1");
res.status(200).json({unix:new Date(date).getTime(),utc:new Date(date).toUTCString()});
  }




if(unix_epoch_regex.test(date))
{
  console.log("Here 3");
  res.status(200).json({unix:new Date(parseInt(date*1)).getTime(),utc:new Date(parseInt(date)).toUTCString()});
  }

const temp = new Date(date).getTime()

 if (Number.isNaN(temp))
 {
  res.json({error:'Invalid Date'})
 }
 else
{
  console.log("Here 4");
  res.status(200).json({unix:new Date(date).getTime(),utc:new Date(date).toUTCString()})
  }

})


// listen for requests :)
var listener = app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});
