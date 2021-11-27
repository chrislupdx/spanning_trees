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
    //console.log(adjList); //each address has a path for all 28 others
    const keys = Object.keys(adjList); //grabs a random vertexZj
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    MST[first_city] = adjList[first_city];
    adjList[first_city].visited = true;
    //console.log("keys are", keys.length);
    for(let i = 0; i < (keys.length - 1); i++) //the real stopping condition is when mst lenght == adjlist.length -1  //TODO this stopping conidition is suspciious
    {
        let shortest_path_city_to;
        let shortest_path_city_from;
        let shortest_len = findShortestPath(MST);
        //console.log(shortest_len);
        //console.log(MST);
        addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len);
        //console.log(Object.keys(MST).length);
    }
    //what do we do with the adjacency list
    console.log(Object.keys(MST).length);
    //console.log(MST);
}
//TODO only add vertices we have NOT visited
function addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len)
{
    for(vertex in MST)
    {
        //console.log("vertex in loop is", vertex);
        for(let i = 0; i < MST[vertex].length; i++)
        {

            if(MST[vertex][i][3] == shortest_len && MST[vertex][i][0] == null) //AND THE CITY IS UNVISITEDyyA TODO //if(MST[vertex][i][3] == shortest_len && MST[vertex].visited == false) //AND THE CITY IS UNVISITEDyyA
            {
                MST[vertex][i][0] = 1; //marked off the path from -> to
                shortest_path_city_to = MST[vertex][i][2]; //something feelsl ike this should occur in separately
                shortest_path_city_from = MST[vertex][i][1]; //TODO 
                //console.log(MST[vertex][vertex.length + 1], "!");
                //console.log("spc_t", shortest_path_city_to, "spc_from", shortest_path_city_from); 
                //console.log(shortest_path_city_from, "spcf in loop");
                adjList[shortest_path_city_to].visited = true;
                adjList[shortest_path_city_from].visited = true;
                MST[shortest_path_city_to] = adjList[shortest_path_city_to];
                console.log(MST[shortest_path_city_to].length, "spct in loop"); //TODO this is issue
                MST[shortest_path_city_from] = adjList[shortest_path_city_from];
                //mark off to -> from
                //for(let i = 0; i < MST[shortest_path_city_to].length; i++) //TODO
                //{
                //    if(MST[shortest_path_city_to][i][2] == shortest_path_city_from)
                //    {
                //        MST[shortest_path_city_to][i][0] = 1;
                //    }
                //}
                break;
            }
        }
    }
    //console.log(MST);
    //console.log("in av shortest path city to is", shortest_path_city_to, MST[shortest_path_city_to]);
    //mark off the path to -> from
    //for(let i = 0; i < MST[shortest_path_city_to].length; i++) //TODO
    //{
    //    if(MST[shortest_path_city_to][i][2] == shortest_path_city_from)
    //    {
    //        MST[shortest_path_city_to][i][0] = 1;
    //    }
    //}
}
function findShortestPath(mst)
{
    let shortest_len = Number.POSITIVE_INFINITY;
    for(vertex in mst)
    {   
        for(let i = 0; i < mst[vertex].length; i++)
        {
            //if(mst[vertex][i][0] != 1 && mst[vertex].visited == false) //and its unvisited path and vertex
            if(mst[vertex][i][0] === null) //and its unvisited path and vertex
            {
                shortest_len = Math.min(shortest_len, mst[vertex][i][3]); //TODO  we could mark it off here actually
                mst[vertex].visited = true;
            }
        }
    }
    return shortest_len;
}
let data = parseText();
let list = adjList(data);
prims(list);
