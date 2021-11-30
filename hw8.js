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
function hasVertex(MST, name)
{
    for(vertex in MST)
    {
        if(name == vertex)
        {
            //console.log("name is ", name, "vertex is ", vertex);
            return true
        }
    }
    //console.log(name, " is not in MST atm");
    return false;
}
function prims(adjList)
{
    let MST = new Object();  //this is an adjacency list
    const keys = Object.keys(adjList); //grabs a random vertexZj
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    MST[first_city] = adjList[first_city];
    let totalweight = 0;
    for(let i = 0; i < keys.length; i++) //the real stopping condition is when mst lenght == adjlist.length -1  //TODO this stopping conidition is suspciious
    {
        let shortest_len = findShortestPath(MST); //put adjList in here TODO
        totalweight += shortest_len;
        addVertex(MST, adjList, shortest_len);
    }
    console.log(MST, Object.keys(MST).length, "is keys", totalweight, " total weight");
}
function addVertex(MST, adjList, shortest_len)
{
    let shortest_path_city_to;
    let shortest_path_city_from;
    for(vertex in MST)  
    {
        let phrase = vertex;
        for(let i = 0; i < MST[phrase].length; i++)
        { 
            if(MST[phrase][i][3] == shortest_len && hasVertex(MST, MST[phrase][i][2]) === false) //and the name of the the vertex we are connecting to does not exist in the mst
            {
                //console.log("shortest len_to is", MST[vertex][i][2]);
                MST[phrase][i][0] = 1; //marked off the path from -> to
                shortest_path_city_to = MST[phrase][i][2]; 
                shortest_path_city_from = MST[phrase][i][1]; 
                adjList[shortest_path_city_to].visited = true;
                adjList[shortest_path_city_from].visited = true;
                MST[shortest_path_city_to] = adjList[shortest_path_city_to];
                MST[shortest_path_city_from] = adjList[shortest_path_city_from];
                for(let i = 0; i < MST[shortest_path_city_to].length; i++) //mark off to -> from
                {
                    if(MST[shortest_path_city_to][i][2] == shortest_path_city_from)
                    {
                        MST[shortest_path_city_to][i][0] = 1;
                    }
                }
                break;
            }
        }
    }
}
function findShortestPath(mst) //check if we are saving and comparing between vertices
{
    //console.log("START shortest");
    //console.log(Object.keys(mst), "is keys of the mst currently at the start of findshortest");
    let shortest_len = Number.POSITIVE_INFINITY; //should this be remembered between addresses as a smallest_len
    let shortest_len_city_from;
    let shortest_len_city_to;
    let found = false; 
    for(vertex in mst)
    {   
        let phrase = vertex;
        for(let i = 0; i < mst[phrase].length; i++)
        { 
            if((hasVertex(mst, mst[phrase][i][2]) === false) && mst[vertex][i][0] != 1) //and its unvisited path and vertex
            { //what if we did 108-112 IF successfully smaller
                shortest_len_city_to = mst[phrase][i][2];  //TODO 
                shortest_len_city_from = mst[phrase][i][1];  //TODO 
                let curr_shortest_len = mst[phrase][i][3];
                shortest_len = Math.min(shortest_len, curr_shortest_len); 
                console.log("considering  slc_from: ", shortest_len_city_from, "slc_to: ", shortest_len_city_to, "that length is", curr_shortest_len,  " BUT shortest len is ", shortest_len);
                mst[phrase].visited = true;
            } 
        }
    }
    console.log("FINAL lengtth " , shortest_len,);
    return shortest_len;
}
let data = parseText();
let list = adjList(data);
prims(list);
