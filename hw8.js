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
    
    for(let i = 0; i < data.length; i++)
    {
        if(data[i][1] in list) //if data[i][1] exists as a key in list
        {
            list[data[i][1]].push(data[i]);
        }
        else //produce a new defintion named data[i][1]
        {
            list[data[i][1]] = [];
            list[data[i][1]].push(data[i]);
            list[data[i][1]].visited = false;
        }
    }
    //console.log(list); 
    //console.log("list is long: ", Object.keys(list).length);
    return list
}

function prims(adjList)
{
    //console.log(adjList);
    const mst = new Object(); //how does this want to be represented
  
    //pick a random key 
    //var randomVertex = function (adjList) {
    //    var keys = Object.keys(adjList);
    //    return adjList[keys[ keys.length * Math.random() << 0]];
    //};
    //console.log(randomVertex());
    
    //select a vertex
    //if(list[data[0][1].visited == false)
    //{
    //    //the data[0][1] is the initial vertex of the mst 
    //    mst[0] = data[0][1];
    //}
    //else
    //{
    //    console.log("data[0][1].visited is true");
    //}
    //console.log(mst);

    //console.log(adjList);

    //for(let i = 1; i < data.length; i++)
    //{
    //    //let shortEdge = findV(); //not sure what it needs to do that yet
    //}
}

function kruskal(adjList)
{}
//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in dataj
//}
let data = parseText();
let list = adjList(data);
let primMst = prims(list);
