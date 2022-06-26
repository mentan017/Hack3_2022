const express = require('express');
const countryIso = require('country-iso');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/Client"));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/Client/index.html");
});
app.post('/GetResults', async(req, res)=>{
    var XCoords = req.body.XCoords;
    var YCoords = req.body.YCoords;
    XCoords = XCoords.sort((a, b) => a - b);
    YCoords = YCoords.sort((a, b) => a - b);
    var Countries = [];
    for(var i=YCoords[0]; i<YCoords[1]; i++){
        for(var j=XCoords[0]; j<XCoords[1]; j++){
            var tempCountry = countryIso.get(i, j);
            for(var k=0; k<tempCountry.length; k++){
                var currentCountryIndex = (Countries.indexOf(tempCountry[k]));
                if(currentCountryIndex == -1){
                    Countries.push(tempCountry[k]);
                }
            }
        }
    }
    res.status(200).send("Hallo!");
});

app.listen(5000);
console.log("The server is running on port 5000");
/*      var firstDate = new Date();
        var firstTime = firstDate.getTime();
        var secondDate = new Date();
        var secondTime = secondDate.getTime(); */