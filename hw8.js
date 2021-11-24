//This is an implementation of Prim's
let fs = require('fs');

//returns an edge list represented as an object. 
//we can access it like this: data[x][y], where x is the line item, y=0 is to_vertex, y=1 from_vertex, y=2 is edge weigth
function parseText()
{
    const fileData = fs.readFileSync('/home/chlu/common/Documents/350/hw8/city-pairs.txt', "utf8"); //parse the file
    const arrData = fileData.split("\n");  //parse this into an array by newline character
    const cleaned = [];
    for(let i = 0; i < (arrData.length - 1); i++)
    {
        cleaned[i] = arrData[i].split(" ");
        cleaned[i].unshift(null);
    }
    //add a 
    return cleaned;
}

//converts a vertex list into an adjacency list
//note: is data even an edge list? 20:09
function adjList(data)
{
    let list = new Object();
    
    //for each unique key
    for(let i = 0; i < data.length; i++)
    {
        if(data[i][1] in list)
        {
            list[data[i][1]].push(data[i]);
        }
        else //produce a new defintion
        {
            list[data[i][1]] = [];
            list[data[i][1]].push(data[i]);
        }
    }
    console.log(list); 
    console.log("list is long: ", Object.keys(list).length);
}

function prims(data)
{

    //console.log(data);
    const mst = [];

    for(let i = 1; i < data.length; i++)
    {
        //let shortEdge = findV(); //not sure what it needs to do that yet

    }
}

//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in data
//}

let data = parseText();
let list = adjList(data);
