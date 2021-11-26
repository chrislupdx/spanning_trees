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

function prims(adjList)
{
    let MST = new Object();  //this is an adjacency list
    //what if mst was an array  (we'd need to keep track of indexes)

    const keys = Object.keys(adjList); //grabs a random vertex
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    MST[first_city] = adjList[first_city];
    adjList[first_city].visited = true;
    console.log("keys are", keys.length);
    for(let i = 0; i < (keys.length - 1); i++) //the real stopping condition is when mst lenght == adjlist.length -1 
    {
        //the stuff below keeeps looping until we fill the mst
        let shortest_path_city_to;
        let shortest_path_city_from;
        let shortest_len = findShortestPath(MST);
        addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len);
        console.log(Object.keys(MST).length);
    }
    //what do we do with the adjacency list
    console.log(MST);
}

function addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len)
{
    for(vertex in MST)
    {
        //console.log("vertex in loop is", vertex);
        for(let i = 0; i < MST[vertex].length; i++)
        {
            if(MST[vertex][i][3] == shortest_len && MST[vertex][i][0] == null)
            {
                MST[vertex][i][0] = 1; //marked off the path from -> to
                shortest_path_city_to = MST[vertex][i][2]; //something feelsl ike this should occur in separately
                shortest_path_city_from = MST[vertex][i][1];
                //console.log(shortest_path_city_from, "spcf in loop");
                adjList[shortest_path_city_to].visited = true;
                adjList[shortest_path_city_from].visited = true;

                MST[shortest_path_city_to] = adjList[shortest_path_city_to];
                console.log(MST[shortest_path_city_to].length, "spct in loop"); //TODO this is issue
                MST[shortest_path_city_from] = adjList[shortest_path_city_from];
                break;
            }
        }
    }

    //console.log(MST);
    //console.log("in av shortest path city to is", shortest_path_city_to, MST[shortest_path_city_to]);

    //mark off the path to -> from
    for(let i = 0; i < MST[shortest_path_city_to].length; i++)
    {
        if(MST[shortest_path_city_to][i][2] == shortest_path_city_from)
        {
            MST[shortest_path_city_to][i][0] = 1;
        }
    }
}

function findShortestPath(mst)
{
    let shortest_len = Number.POSITIVE_INFINITY;
    for(vertex in mst)
    {   
        for(let i = 0; i < mst[vertex].length; i++)
        {
            if(mst[vertex][i][0] != 1) //and its unvisited
            {
                shortest_len = Math.min(shortest_len, mst[vertex][i][3]); //TODO  we could mark it off here actually
            }
        }
    }
    return shortest_len;
}

let data = parseText();
let list = adjList(data);
prims(list);
