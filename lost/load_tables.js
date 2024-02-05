function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
	delete(xmlHttp);
    return xmlHttp.responseText;
}

//First, handle the first table
let lost_text = httpGet("https://raw.githubusercontent.com/radio-satellites/UTS_LF_TRACKER_DATA/main/lost.txt").split(/\r?\n/);
//console.log(lost_text);

lost_text.splice(-1);
lost_text.shift();

var table = document.getElementById("lostTable");

for (let i = 0; i < lost_text.length; i++) {
  var row = table.insertRow(1);
  let line = lost_text[i];
  let cells = line.split(",");
  for (let x = 0; x < cells.length; x++){
	var cell = row.insertCell(x);
	cell.innerHTML = cells[x];
  }
  //console.log(cells);
}

//Now the other

let found_text = httpGet("https://raw.githubusercontent.com/radio-satellites/UTS_LF_TRACKER_DATA/main/found.txt").split(/\r?\n/);
//console.log(lost_text);

found_text.splice(-1);
found_text.shift();

table = document.getElementById("recentlyFoundTable");

for (let i = 0; i < lost_text.length; i++) {
  row = table.insertRow(1);
  line = found_text[i];
  cells = line.split(",");
  for (let x = 0; x < cells.length; x++){
	var cell = row.insertCell(x);
	cell.innerHTML = cells[x];
  }
  //console.log(cells);
}
