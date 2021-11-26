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

function prim1(adjList)
{
    let data = adjList; //our base map is an adjacency list

    const keys = Object.keys(data); //grabs a random vertex
    const first_city = keys[Math.floor(Math.random() * keys.length)];

    let mst = new Object();
    mst[first_city] = adjList[first_city];
    data[first_city].visited = true;

    let shortest_len = Number.POSITIVE_INFINITY; //what if this was a funcitn

}

//make this recursive?
function recurr(mst, data)
{
    if(Object.keys(mst).length == (Object.keys(data).length - 1)) return;
    let shortest_len = Number.POSITIVE_INFINITY; //we want the shortest possible next path of the whole mst
    //search a single vertex in the MST(we need to scale this for all vertices in the mst)
    //TODO this isn't working bc mst inst increasing in length between iterations
    for(vertex in mst) //wait shouldn't this be until mst.length = data.verticecount - 1
    {
        for(let i = 0; i < mst[vertex].length; i++) //find the shortest length //we might need to do things with data[vertex].visited
        {
            shortest_len = Math.min(shortest_len, mst[vertex][i][3]);
        }

        let shortest_path_city_from;
        let shortest_path_city_to;
        for(let i = 0; i < mst[vertex].length; i++) 
        {
            if(mst[vertex][i][3] == shortest_len) //TODO 
            {
                data[vertex].visited = true; //TODO does this even need to occur here?
                console.log("shortest length is ", mst[vertex][i]);
                shortest_path_city_to = mst[vertex][i][2]; //grab the name of our next new city
                shortest_path_city_from = mst[vertex][i][1]; //grab the name of where it comes from
                mst[shortest_path_city_to] = data[shortest_path_city_to]; //create a key,val pair in mst(add the city) TODO 
                mst[shortest_path_city_from] = data[shortest_path_city_from]; //TODO this was a gut instinct add, what's going on here
                data[shortest_path_city_from].visited = true; 
                data[shortest_path_city_to].visited = true; 
                break; //this might be the issue
            }
        }
        console.log("shortest path city from is ", shortest_path_city_from, " shortest path city to is ", shortest_path_city_to);

        for(let i = 0; i < mst[vertex].length; i++) //go through every single array entry in each mst definition
        {
            //TODO this comparison locks it
            if(mst[vertex] == mst[shortest_path_city_from]) //if we are in the origin vertex's  TODO 
            {
                if(mst[vertex][i][2] == shortest_path_city_to)
                {
                    mst[vertex][i][0] = 1;
                }
            }
            if(mst[vertex] == mst[shortest_path_city_to])
            {
                if(mst[vertex][i][2] == shortest_path_city_from)
                {
                    mst[vertex][i][0] = 1;
                }
            }
        }
        console.log(vertex, " is vertex"); 
    }
    //return recurr(mst, data);
    return mst;
}

function prims(adjList)
{
    let data = adjList;
    const keys = Object.keys(data); //grabs a random vertex
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    let mst = new Object(); //our mst is an adjacency list just like data
    mst[first_city] = data[first_city];
    data[first_city].visited = true; //mark our starting vertex on the adjacency list
    //get the vertex count in data
    
    //this is disgusting but we added a 3rd city
    let updatemst = recurr(mst,data); //this finds the closest vertex to the mst and adds it in
    recurr(updatemst, data);
    //console.log("shortest_path_city", shortest_path_city, " first city ", first_city);
    console.log("updatemst ", Object.keys(updatemst).length, updatemst);
}

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
let primMst = prims(list);
