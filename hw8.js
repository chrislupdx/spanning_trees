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
            return true
        }
    }
    return false;
}
function prims(adjList)
{
    let MST = new Object();  //this is an adjacency list
    const keys = Object.keys(adjList); //grabs a random vertexZj
    console.log('keys', keys.length);
    const first_city = keys[Math.floor(Math.random() * keys.length)];
    MST[first_city] = adjList[first_city];
    let totalweight = 0;
    for(let i = 0; i < keys.length; i++) //the real stopping condition is when mst lenght == adjlist.length -1  //TODO this stopping conidition is suspciious
    {
        let shortest_len = findShortestPath(MST); //put adjList in here TODO
        if(i < (keys.length - 1))
        {
            totalweight += shortest_len;
        }
        addVertex(MST, adjList, shortest_len);
    }
    //console.log(MST, Object.keys(MST).length, "is keys", totalweight, " is totalweight");
    return MST;
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
    let shortest_len = Number.POSITIVE_INFINITY; //should this be remembered between addresses as a smallest_len
    let shortest_len_city_from;
    let shortest_len_city_to;
    let found = false; 
    for(vertex in mst)
    {   
        let phrase = vertex;
        for(let i = 0; i < mst[phrase].length; i++)
        { 
            console.log(mst[phrase].length);
            if((hasVertex(mst, mst[phrase][i][2]) === false) && mst[vertex][i][0] != 1) //and its unvisited path and vertex
            { //what if we did 108-112 IF successfully smaller
                shortest_len_city_to = mst[phrase][i][2];  //TODO 
                shortest_len_city_from = mst[phrase][i][1];  //TODO 
                let curr_shortest_len = mst[phrase][i][3];
                shortest_len = Math.min(shortest_len, curr_shortest_len); 
                //console.log("considering  slc_from: ", shortest_len_city_from, "slc_to: ", shortest_len_city_to, "that length is", curr_shortest_len,  " BUT shortest len is ", shortest_len);
                mst[phrase].visited = true;
            } 
        }
    }
    return shortest_len;
}

function generateFile(stuff)
{
    let done = stuff;
    fs.writeFile("sampletext.txt", done, function (err) {
        if(err) return console.log(err)
        {
            console.log("done -> smapletext.txt");
        }
    });
}

//this is an interface function
function generategraph(cityNum)
{
    console.log("cityNum is ", cityNum);
    let didgraph = {};
    let citynum = cityNum;
    let cities = [];
    for(let i = 0; i < cityNum; i++)
    {
        let cityName = require("crypto").randomBytes(2).toString("hex");
        cities.push(cityName);
    }
    for(let i = 0; i < cities.length; i++)
    {
        didgraph[cities[i]] = [];
        for(let a = 0; a < cities.length; a++)  //path # = cities - 1
        {
            if(cities[a] != cities[i])
            {
                didgraph[cities[i]].push([cities[i], cities[a], Math.floor(Math.random() * 100).toString()]);
            }
        }
    }
    return didgraph;
}
//this function generates cleaned text
function interfaceF()
{
    let data = parseText();
    //let list = adjList(data);
    let genlist = generategraph(4); 
    console.log(genlist);
    let keys = Object.keys(genlist);
    let hm = "";
    for( vertex in genlist)
    {
        let phrase = vertex;
        for(let i = 0; i < genlist[phrase].length; i++)
        {
            let thing = genlist[phrase][i].toString();
            console.log(thing);
            hm = hm + thing + ",";
        }
    }
    console.log("hm is before", hm); //we have a comma separated string of values
    //let regex = /([a-zA-Z0-9]{4})(,)([a-zA-Z0-9]{4})(,)([a-zA-Z0-9]{2}|[a-zA-Z0-9]{1}),?(\R)?/gm
    //hm.replace(regex);

    let parts = hm.split(',')
    let output = [];
    for(let i = 0; i < parts.length - 1; i += 3)
    {
        let part = parts.slice(i, i+3);
        output.push(part);
    }
    console.log("after", output);
//    generateFile(output);
    //generateFile(genlist); //brings sampletext.txt into existence TODO
    //let startTime = performance.now(); 
    //let mst = prims(list); 
    //let endTime = performance.now();
    //let delta =  endTime - startTime; //outputs in milliseconds i belive
    //console.log(mst);
    //console.log("elapsed time is ", (delta * 0.001), " seconds");//
}
interfaceF();
//generate a js program that generates text files
//fll and format formatted  like city-pairs.txt
//build a function interface that facilitates that
