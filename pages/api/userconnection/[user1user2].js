import _ from "lodash";
var neo4j = require('neo4j-driver');
var driver = neo4j.driver(
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "kXQvU8aeNdreD6LeEdSPtA29TlwHz2LgvN2OoM2brl0")
  );

var session = driver.session();
export default function handler({query: {user1user2}}, res) {
    // console.log('St George Connections Search +++ V2 Boom 7777 🙌🙌: ', user1user2)
    const xx = user1user2.split('1000')
    // console.log('XX Split', xx[0], xx[1])
    var searchStatement = "Match (p1:Member {name: '"
    searchStatement = searchStatement+ xx[0] + "'}), (p2:Member {name: '"
    searchStatement = searchStatement+ xx[1] + "'}), path = shortestpath((p1)-[*..7]-(p2)) where NONE (r in relationships(path) WHERE type(r) = 'BELONGS_TO') WITH p1, p2, path, range(0,length(path)-1) as index return p1, p2, path, [i in index | CASE WHEN nodes(path)[i] = startNode(RELATIONSHIPS(path)[i]) THEN 'incoming' ELSE 'outgoing' END ] as directions "
    // console.log('XX Split', xx[0], xx[1])
    // console.log('Search Statement', searchStatement)

    var nodeType = "parent"
    var userNodes = []
    var userLinks = []
    var membersList = []
    var source = ""

    session
      .run(`${searchStatement}`)
      .then(function(result){
        // console.log('Success Result 😎😎', result.records)
        result.records.forEach(function(record){
          // console.log('Search result record 0 😢😢', record._fields[0])
          // console.log('Search result record 2 Start 😢😢', record._fields[2])
          // console.log('Search result record 2 Segments Path Segment 😢😢', record._fields[2].segments.PathSegment)
          // console.log('Search result record 2 Segment Start 😢😢', record._fields[2].segments.length)
          // console.log('Search result record 2 Segment Start 😢😢', record._fields[2].segments.length)
          // console.log('Search result record 3 😢😢 😎😎', record._fields[3])
          // console.log('Start person', record._fields[0].properties.name) 

          membersList.push({
            id: record._fields[0].properties.name,
            name: record._fields[0].properties.name,
            imageURL: record._fields[0].properties.imageURL,
          })
          membersList.push({
            id: record._fields[1].properties.name,
            name: record._fields[1].properties.name,
            imageURL: record._fields[1].properties.imageURL,
          })
          source = record._fields[0].properties.name
          for (var i = 1; i< record._fields[2].segments.length; i++){
            // console.log('In for Loop i=', i, 'Record is: ', record._fields[2].segments[i].start.properties)
           if (record._fields[3][i] === 'outgoing') { 
              nodeType = 'child'
            } else {
              nodeType = 'parent'
            }
            userNodes.push({
              id: source,
              name: source,
              __typename: nodeType
            })
            userLinks.push({
              source: source,
              target: record._fields[2].segments[i].start.properties.name
            })
            source = record._fields[2].segments[i].start.properties.name
          }
          var n = record._fields[2].segments.length -1
          
          // nodeType = 'child'
          // Finishin up here
          userNodes.push({
            id: source,
            name: source,
            __typename: nodeType
          })
          if (record._fields[3][n] === 'outgoing') { 
            nodeType = 'parent'
          } else {
            nodeType = 'child'
          }
          userNodes.push({
            id: record._fields[1].properties.name,
            name: record._fields[1].properties.name,
            __typename: nodeType
          })
          userLinks.push({
            source: source,
            target: record._fields[1].properties.name
          })
        })
        // console.log('Member List 🤳🤳🤳💥💥💥💥💥💥', membersList)
        // console.log('User Nodes', userNodes)
        // console.log('User Links', userLinks)
        const data =  {nodes:userNodes,
                    links: userLinks
                    }
        const membersData={members: _.uniqBy(membersList, "id")}
        res.status(200)
        .json({data: data, membersData: membersData})
      })
      .catch(function(error){
        res.status(201).json({message: 'Error'})
        // console.log('Hai hai', error)
      })
}