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
    const rand_vertex = keys[Math.floor(Math.random() * keys.length)];

    //how are you representing your MST?
    let mst = new Object(); //initialize mst with a random vertex, mark that vertex as visited

    mst[rand_vertex] = adjList[rand_vertex];
    data[rand_vertex].visited = true; //mark our starting vertex on the adjacency list

    //find the array with the shortest path/edge around the MST
    let shortest = Number.POSITIVE_INFINITY;

    //search a single vertex in the MST(we need to scale this for all vertices in the mst)
    for(vertex in mst)
    {
        for(let i = 0; i < mst[rand_vertex].length; i++)
        {
            shortest = Math.min(shortest, mst[rand_vertex][i][3]);
        }
    }

    let shortest_vertex;
    //grab the vertex+path we just found
    for(let i = 0; i < mst[rand_vertex].length; i++) //wait by mst?
    {
        if(mst[prop][i][3] == shortest)
        {
            console.log(mst[prop][i]);
            //add the corresponding city to mst as a definition
            //mark the right definition in data as visitited
        }
    }

}

//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in dataj
//}
let data = parseText();
let list = adjList(data);
let primMst = prims(list);
