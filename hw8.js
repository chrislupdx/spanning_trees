//This is the interface page
let fs = require('fs');

//returns an adjacency matrix represented as an object. 
//we can access it like this: data[x][y], where x is the line item, y=0 is to_vertex, y=1 from_vertex, y=2 is edge weigth
function parseText()
{
    const fileData = fs.readFileSync('/home/chlu/common/Documents/350/hw8/city-pairs.txt', "utf8"); //parse the file
    const arrData = fileData.split("\n");  //parse this into an array by newline character
    const cleaned = [];
    for(let i = 0; i < arrData.length; i++)
    {
        cleaned[i] = arrData[i].split(" ");
    }
    //console.log(cleaned[0][]); //accessible like this
    return cleaned;
}


let data = parseText();
