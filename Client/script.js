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
        
        var AreaElement = document.getElementById("TestDiv");
        AreaElement.style.top = `${PageY}px`;
        AreaElement.style.left = `${PageX}px`;
    }else if(XCoords[1] == null || YCoords[0] == null){
        XCoords[1] = XCoord;
        document.getElementById("CoordX2").valueAsNumber = XCoord;
        YCoords[1] = YCoord;
        document.getElementById("CoordY2").valueAsNumber = YCoord;
        
        var AreaElement = document.getElementById("TestDiv");
        AreaElement.style.width = `${PageX - parseInt((AreaElement.style.left).replace("px"))}px`;
        AreaElement.style.height = `${PageY - parseInt((AreaElement.style.top).replace("px"))}px`;
        AreaElement.style.display = "block";
    }
}
function updateCoordinateX1(){
    XCoords[0] = document.getElementById("CoordX1").valueAsNumber;
    var DistanceLeft = (XCoords[0]+180)*((document.getElementById("WorldMapImg").offsetWidth)/360) + 52;
    var AreaElement = document.getElementById("TestDiv");
    AreaElement.style.left = `${DistanceLeft}px`;
    updateCoordinateX2();
}
function updateCoordinateY1(){
    YCoords[0] = document.getElementById("CoordY1").valueAsNumber;
    var DistanceTop = (90-YCoords[0])*((document.getElementById("WorldMapImg").offsetHeight)/180) + 68;
    var AreaElement = document.getElementById("TestDiv");
    AreaElement.style.top = `${DistanceTop}px`;
    updateCoordinateY1();
}
function updateCoordinateX2(){
    var CoordX2 = document.getElementById("CoordX2").valueAsNumber;
    if(CoordX2 != NaN){
        XCoords[1] = CoordX2;
        if(document.getElementById("TestDiv").style.left != ""){
            var X1Position = (XCoords[0]+180)*((document.getElementById("WorldMapImg").offsetWidth)/360) + 52;
            var X2Position = (XCoords[1]+180)*((document.getElementById("WorldMapImg").offsetWidth)/360) + 52;
            document.getElementById("TestDiv").style.width = `${X2Position - X1Position}px`;
        }
    }
    CanDrawArea();
}
function updateCoordinateY2(){
    var CoordY2 = document.getElementById("CoordY2").valueAsNumber;
    if(CoordY2 != NaN){
        YCoords[1] = CoordY2;
        if(document.getElementById("TestDiv").style.left != ""){
            var Y1Position = (90-YCoords[0])*((document.getElementById("WorldMapImg").offsetHeight)/180) + 68;
            var Y2Position = (90-YCoords[1])*((document.getElementById("WorldMapImg").offsetHeight)/180) + 68;
            document.getElementById("TestDiv").style.height = `${Y2Position - Y1Position}px`;
        }
    }
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
function CanDrawArea(){
    var CoordX1 = document.getElementById("CoordX1").valueAsNumber;
    var CoordY1 = document.getElementById("CoordY1").valueAsNumber;
    var CoordX2 = document.getElementById("CoordX2").valueAsNumber;
    var CoordY2 = document.getElementById("CoordY2").valueAsNumber;
    if(CoordX1 != NaN && CoordY1 != NaN && CoordX2 != NaN && CoordY2 != NaN){
        document.getElementById("TestDiv").style.display = "block";
    }
}
window.addEventListener('mousemove', mousemove);
document.getElementById("WorldMapImg").addEventListener("click", getCoordinates);
document.getElementById("CoordX1").addEventListener("input", updateCoordinateX1);
document.getElementById("CoordY1").addEventListener("input", updateCoordinateY1);
document.getElementById("CoordX2").addEventListener("input", updateCoordinateX2);
document.getElementById("CoordY2").addEventListener("input", updateCoordinateY2);
document.getElementById("SubmitBtn").addEventListener("click", SubmitCoordinates);