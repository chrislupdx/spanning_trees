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
    let MST = new Object();  //this is an adjacency list
    //what if mst was an array  (we'd need to keep track of indexes)

    const keys = Object.keys(adjList); //grabs a random vertex
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    MST[first_city] = adjList[first_city];
    adjList[first_city].visited = true;
    
    for(let i = 0; i < 4; i++) //the real stopping condition is when mst lenght == adjlist.length -1 
    {
    //the stuff below keeeps looping until we fill the mst
    let shortest_path_city_to;
    let shortest_path_city_from;
    let shortest_len = findShortestPath(MST);
    addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len);
    console.log(Object.keys(MST).length);
    }
    //what do we do with the adjacency list
}

function addVertex(MST, adjList, shortest_path_city_to, shortest_path_city_from, shortest_len)
{
    for(vertex in MST)
    {
        for(let i = 0; i < MST[vertex].length; i++)
        {
            if(MST[vertex][i][3] == shortest_len && MST[vertex][i][0] == null)
            {
                MST[vertex][i][0] = 1; //marked off the path from -> to
                shortest_path_city_to = MST[vertex][i][2]; //something feelsl ike this should occur in separately
                shortest_path_city_from = MST[vertex][i][1];

                adjList[shortest_path_city_to].visited = true;
                adjList[shortest_path_city_from].visited = true;

                MST[shortest_path_city_to] = adjList[shortest_path_city_to];
                MST[shortest_path_city_from] = adjList[shortest_path_city_from];
                break;
            }
        }
    }
    
    console.log(MST);
    console.log("in av shortest path city to is", shortest_path_city_to, MST[shortest_path_city_to]);

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
            shortest_len = Math.min(shortest_len, mst[vertex][i][3]);
        }
    }
    return shortest_len;
}


//function recurr(mst, data)
//{
//    if(Object.keys(mst).length == (Object.keys(data).length - 1)) return;
//        
//        let shortest_len = Number.POSITIVE_INFINITY; //we want the shortest possible next path of the whole mst
//        console.log("number of vertices in mst ", Object.keys(mst).length);
//    
//    for(vertex in mst) //wait shouldn't this be until mst.length = data.verticecount - 1
//    {
//        for(let i = 0; i < mst[vertex].length; i++) //find the shortest length //we might need to do things with data[vertex].visited
//        {
//            shortest_len = Math.min(shortest_len, mst[vertex][i][3]);
//        }
//        let shortest_path_city_from;
//        let shortest_path_city_to;
//        for(let i = 0; i < mst[vertex].length; i++) 
//        {
//            if(mst[vertex][i][3] == shortest_len && mst[vertex][i][0] === null) //TODO AND IT HAS NOT BEEN VISITED
//            {
//                data[vertex].visited = true; //TODO does this even need to occur here?
//                console.log("shortest length is ", mst[vertex][i]);
//                shortest_path_city_to = mst[vertex][i][2]; //grab the name of our next new city
//                shortest_path_city_from = mst[vertex][i][1]; //grab the name of where it comes from
//                mst[shortest_path_city_to] = data[shortest_path_city_to]; //create a key,val pair in mst(add the city) TODO 
//                mst[shortest_path_city_from] = data[shortest_path_city_from]; //TODO this was a gut instinct add, what's going on here
//                data[shortest_path_city_from].visited = true; 
//                data[shortest_path_city_to].visited = true; 
//                break; //this might be the issue
//            }
//        }
//        console.log("shortest_path_city_from is ", shortest_path_city_from, " shortest_path_city_to is ", shortest_path_city_to);
//        for(let i = 0; i < mst[vertex].length; i++) //go through every single array entry in each mst definition
//        {
//            if(mst[vertex] == mst[shortest_path_city_from]) //if we are in the origin vertex's  TODO 
//            {
//                if(mst[vertex][i][2] == shortest_path_city_to)
//                {
//                    mst[vertex][i][0] = 1;
//                }
//            }
//            if(mst[vertex] == mst[shortest_path_city_to])
//            {
//                if(mst[vertex][i][2] == shortest_path_city_from)
//                {
//                    mst[vertex][i][0] = 1;
//                }
//            }
//        }
//        console.log(vertex, " is vertex"); 
//    }
//    //let newmst = mst;
//    return recurr(mst, data);
//    //return newmst;
//}
//function prims(adjList)
//{
//    let data = adjList;
//    const keys = Object.keys(data); //grabs a random vertex
//    const first_city = keys[Math.floor(Math.random() * keys.length)];
//    let mst = new Object(); //our mst is an adjacency list just like data
//    mst[first_city] = data[first_city];
//    data[first_city].visited = true; //mark our starting vertex on the adjacency list
//    console.log("mst key count before ", Object.keys(mst).length, mst);
//    //get the vertex count in data
//    //TODO so long as  mst has data.keys.length -1, keep calling
//    mst = recurr(mst,data); //this finds the closest vertex to the mst and adds it in
//    //console.log("shortest_path_city", shortest_path_city, " first city ", first_city);
//    console.log("mst ", Object.keys(mst).length, mst);
//}

//this function might need to be broken up into pieces
function findnextCity(mst, data, rand_city)
{
    //return next_city;
    return mst;
    //we might need to return data(our map);
}

//scans for shortest vertex 
//function findV(name, data)
//{
//    //searches for all of the names in dataj
//}
let data = parseText();
let list = adjList(data);
prims(list);
