var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors())
var fs = require('fs');

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.post("/save", async function (req, res) {
    let data = await getContents();
    if(data[0] == null){
      data = [];
    }else{
      data = JSON.parse(data);
    }
    data.push(req.body.user);
    console.log(req.body.user)
      fs.writeFile('./dataArtist.json', JSON.stringify(data), function(err,result){
        if (err) {
            res.json(error)
        } else {
           res.json("file update!")
        }
      }); 
});

app.post("/delete", async function(req,res){
  let data = await getContents();
  data = JSON.parse(data);
  let i = req.body.index + 1;
  console.log(i);
  data.splice(i, 1); 
  fs.writeFile('./dataArtist.json', JSON.stringify(data), function(err,result){
    if (err) {
        res.json(error)
    } else {
       res.json("file update!")
    }
  });
});

let util = require('util');
const readFile = util.promisify(fs.readFile);
async function getContents() {
  return await readFile("./dataArtist.json", "utf8");
}

app.get('/load', function (req, res) {
  //var object = {"Name":"Kevin Sigma","About":"Best in town","Url":"https://randomuser.me/api/portraits/med/men/55.jpg"};
  getContents().then((data) => res.json(data));
});

app.post('/search', async function (req, res) {
  //var object = {"Name":"Kevin Sigma","About":"Best in town","Url":"https://randomuser.me/api/portraits/med/men/55.jpg"};
  let inputName = req.body.Name;
  console.log(inputName);
  let data = await getContents();
  data = JSON.parse(data);
  let searchResults = [];
  for(let i=0;i<data.length;i++){
    if(data[i].Name.search(inputName)>=0){
      searchResults.push(data[i]);
    }
  //searchResults = JSON.stringify(searchResults);
  }
  console.log(searchResults);
  res.json(searchResults);
});

// what port to run server on
app.listen(5000, function () {
  console.log('server started on port 5000');
});