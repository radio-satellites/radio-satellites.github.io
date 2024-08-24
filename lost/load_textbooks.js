//Finally, the textbook table

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
	delete(xmlHttp);
    return xmlHttp.responseText;
}

function loadTables(filter){
    let textbook_text = httpGet("https://raw.githubusercontent.com/radio-satellites/UTS_TEXT_TRACK/main/textbooks.txt").split(/\r?\n/);
    console.log("Hey there! You've peeked under the hood!")
    console.log("Debug info:");
console.log(textbook_text);

textbook_text.splice(-1);
textbook_text.shift();

var tableHeaderRowCount = 1;
var table = document.getElementById("textbookTable");
var rowCount = table.rows.length;
for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
}

table = document.getElementById("textbookTable");

if (textbook_text.length === 0){
  //console.log("Zero!");
  document.getElementById('notext').innerText = "No listings yet!";
}
else{
  document.getElementById('notext').innerText = "";
}

for (let i = 0; i < textbook_text.length; i++) {
    line = textbook_text[i];
    cells = line.split(",");
    //console.log("Cells -2 is");
    //console.log(cells.at(-2).trim());
    //console.log("Filter is");
    //console.log(filter);
  if (filter === "" || filter === cells.at(-2).trim()){
    row = table.insertRow(1);

  for (let x = 0; x < cells.length; x++){
	var cell = row.insertCell(x);
	cell.innerHTML = cells[x];
  }

  }
  
  //console.log(cells);
}

}
loadTables("");

