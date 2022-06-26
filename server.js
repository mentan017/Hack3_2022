const express = require('express');
const countryIso = require('country-iso');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/Client"));

//res.sendFile(__dirname + "/Client/landing.html");
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/Client/landing.html");
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
        var FinalData = [];
        for(i=0; i<Countries.length; i++){
            var python = spawn('python', ['script.py', Countries[i]]);
            python.stdout.on('data', function (data){
                FinalData.push(FormatData(data.toString()));
                console.log(data.toString());
            });
        }
        //console.log(Countries);
        res.status(200).send("Success");
    }catch(e){
        console.log(e);
        res.status(500).end();
    }
});
async function FormatData(data){
    var SeparatedData = data.split(',');
    var FinalString = '{';
    for(var i=0; i < SeparatedData.length; i++){
        var DataPiece = SeparatedData.split(":");
        FinalString = FinalString + '\"' + DataPiece[0] + '\":\"' + DataPiece[1] + '\"';
    }
    FinalString = FinalString + "}";
    var ForamttedJSON = JSON.parse(FinalString);
    return(ForamttedJSON);
}

app.listen(5000);
console.log("The server is running on port 5000");