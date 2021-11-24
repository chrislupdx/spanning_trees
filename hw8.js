//This is an implementation of Prim's
let fs = require('fs');

//returns an edge list represented as an object. we can access it like this: data[x][y], where x is the line item, y=0 is to_vertex, y=1 from_vertex, y=2 is edge weigth
function parseText()
{
    const fileData = fs.readFileSync('/home/chlu/common/Documents/350/hw8/city-pairs.txt', "utf8"); //parse the file
    //const fileData = fs.readFileSync('/home/chlu/common/Documents/350/hw8/text.txt', "utf8"); //parse the file
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

function arrayEquals(a, b)
{
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for(let i = 0; i < a.length; i++)
    {
        if (a[i] !== b[i]) return false;
    }
    return true;
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

    //-----------------------------------------------------------------------
    //find the array with the shortest path/edge around the MST
    let shortest_len = Number.POSITIVE_INFINITY;
    //search a single vertex in the MST(we need to scale this for all vertices in the mst)
    for(vertex in mst)
    {
        for(let i = 0; i < mst[rand_city].length; i++)
        {
            shortest_len = Math.min(shortest_len, mst[rand_city][i][3]);
        }
    }
    
    let shortest_vertex;
    let next_city;
    
    //grab the vertex+path we just found
    for(let i = 0; i < mst[rand_city].length; i++)
    {
        if(mst[rand_city][i][3] == shortest_len)
        {
            data[rand_city].visited = true;
            next_city = mst[rand_city][i][2]; //grab the name of our next city
            mst[next_city] = data[next_city]; //create a key,val pair in mst(add the city)
            data[next_city].visited = true; 
            break;
        }
    }
    
    for(vertex in mst) //this chunk marks off the paths from null->1
    {
        //go through every single array entry in each mst definition
        for(let i = 0; i < mst[vertex].length; i++)
        {
            if(mst[vertex] == mst[rand_city]) //if we are in the origin vertex's 
            {
                if(mst[vertex][i][2] == next_city)
                {
                    mst[vertex][i][0] = 1;
                }
            }

            if(mst[vertex] == mst[next_city])
            {
                if(mst[vertex][i][2] == rand_city)
                {
                    mst[vertex][i][0] = 1;
                }
            }
        }
    }
    //----------------------------------------------------------------------------------:w

    //repeat
    console.log("mst is ");
    console.log(mst);
    console.log("rand city ", rand_city);
    console.log("next city ", next_city);
}

//this function 
function primrecurr(mst, data)
{

}

//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in dataj
//}
let data = parseText();
let list = adjList(data);
let primMst = prims(list);
