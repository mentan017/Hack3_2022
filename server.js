const express = require('express');
const countryIso = require('country-iso');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/Client"));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/Client/index.html");
});
app.post('/GetResults', async(req, res)=>{
    try{
        var XCoords = (req.body.XCoords).sort((a, b) => a - b);
        var YCoords = (req.body.YCoords).sort((a, b) => a - b);
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
        //The countries in the chosen area are stored in Countries

        res.status(200).send("Success");
    }catch(e){
        console.log(e);
        res.status(500).end();
    }
});

app.listen(5000);
console.log("The server is running on port 5000");