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
    const rand_city = keys[Math.floor(Math.random() * keys.length)];

    //how are you representing your MST?
    let mst = new Object(); //initialize mst with a random vertex, mark that vertex as visited

    mst[rand_city] = adjList[rand_city];
    data[rand_city].visited = true; //mark our starting vertex on the adjacency list

    //find the array with the shortest path/edge around the MST
    let shortest = Number.POSITIVE_INFINITY;
    //search a single vertex in the MST(we need to scale this for all vertices in the mst)
    for(vertex in mst)
    {
        for(let i = 0; i < mst[rand_city].length; i++)
        {
            shortest = Math.min(shortest, mst[rand_city][i][3]);
        }
    }

    let shortest_vertex;
    let next_city;
    //grab the vertex+path we just found
    for(let i = 0; i < mst[rand_city].length; i++) //wait by mst?
    {
        if(mst[rand_city][i][3] == shortest)
        {
            data[rand_city].visited = true;
            next_city = mst[rand_city][i][2]; //grab the name of our next city
            mst[next_city] = data[next_city]; //create a key,val pair in mst(add the city)
            data[next_city].visited = true; 
            
            //mark the right definition in data as visitited
            //mark in rand_city's path to next_city as 1
            //mark in next_city's path to rand_city's path as 1

        }
    }
    console.log("mst is ");
    console.log(mst);
    console.log("rand city ", rand_city);
    console.log("next city ", next_city);
}

//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in dataj
//}
let data = parseText();
let list = adjList(data);
let primMst = prims(list);
