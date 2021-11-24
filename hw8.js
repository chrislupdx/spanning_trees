//This is an implementation of Prim's
let fs = require('fs');

//returns an edge list represented as an object. we can access it like this: data[x][y], where x is the line item, y=0 is to_vertex, y=1 from_vertex, y=2 is edge weigth
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
    return list
}

function prims(adjList)
{
    let data = adjList;
    const keys = Object.keys(data); //grabs a random vertex
    const prop = keys[Math.floor(Math.random() * keys.length)];
   
    let mst = new Object(); //initialize mst with a random vertex, mark it as visited
    mst[prop] = adjList[prop];
    data[prop].visited = true; //mark our starting vertex on the adjacency list
    
    let shortest = Number.POSITIVE_INFINITY;
    for(let i = 0; i < mst[prop].length; i++)
    {
        console.log(mst[prop][i][3]);
        shortest = Math.min(shortest, mst[prop][i][3]);
    }
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
