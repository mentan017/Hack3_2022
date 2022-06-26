var PageX = 0;
var PageY = 0;
var XCoords = [null, null];
var YCoords = [null, null];
function mousemove(event){
    PageX = event.pageX;
    PageY = event.pageY;
}
function getCoordinates(){
    var MapImg = document.getElementById("WorldMapImg");
    var MapWidth = MapImg.offsetWidth;
    var MapHeight = MapImg.offsetHeight;
    var RelativeX = PageX - 52;
    var RelativeY = PageY - 68;
    console.log(`The relative coordinates are: ${RelativeX} & ${RelativeY}`)
    var XCoord = Math.round(((RelativeX/(MapWidth/360))-180)*10)/10;
    var YCoord = Math.round((90-(RelativeY/(MapHeight/180)))*10)/10;
    if(XCoords[0] == null || YCoords[0] == null){
        XCoords[0] = XCoord;
        document.getElementById("CoordX1").valueAsNumber = XCoord;
        YCoords[0] = YCoord;
        document.getElementById("CoordY1").valueAsNumber = YCoord;
    }else if(XCoords[1] == null || YCoords[0] == null){
        XCoords[1] = XCoord;
        document.getElementById("CoordX2").valueAsNumber = XCoord;
        YCoords[1] = YCoord;
        document.getElementById("CoordY2").valueAsNumber = YCoord;
    }
}
function updateCoordinateX1(){
    XCoords[0] = document.getElementById("CoordX1").valueAsNumber;
}
function updateCoordinateY1(){
    YCoords[0] = document.getElementById("CoordY1").valueAsNumber;
}
function updateCoordinateX2(){
    XCoords[1] = document.getElementById("CoordX2").valueAsNumber;
}
function updateCoordinateY2(){
    YCoords[1] = document.getElementById("CoordY2").valueAsNumber;
}
async function SubmitCoordinates(){
    if(XCoords[0] != null && XCoords[1] != null && YCoords[0] != null && YCoords[1] != null){
        var response = await fetch('/GetResults', {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({XCoords: XCoords, YCoords: YCoords})
        });
        console.log(response.status);
    }
}
window.addEventListener('mousemove', mousemove);
document.getElementById("WorldMapImg").addEventListener("click", getCoordinates);
document.getElementById("CoordX1").addEventListener("input", updateCoordinateX1);
document.getElementById("CoordY1").addEventListener("input", updateCoordinateY1);
document.getElementById("CoordX2").addEventListener("input", updateCoordinateX2);
document.getElementById("CoordY2").addEventListener("input", updateCoordinateY2);
document.getElementById("SubmitBtn").addEventListener("click", SubmitCoordinates);