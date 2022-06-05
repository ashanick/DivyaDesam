import _ from "lodash";

var neo4j = require('neo4j-driver');
var driver = neo4j.driver(
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "kXQvU8aeNdreD6LeEdSPtA29TlwHz2LgvN2OoM2brl0")
  );

var session = driver.session();

function handler(req, res) {
    // console.log('In Clans')
    var membersList = []
    session 
        .run("MATCH (n:Member)-[k:PARENT_OF*4]->(f:Member) RETURN n order by n.name")
        .then(function(result){
            result.records.forEach(function(record){
                // console.log('Record : ', record._fields[0])
                membersList.push({
                    id: record._fields[0].properties.name,
                    name: record._fields[0].properties.name,
                    imageURL: record._fields[0].properties.imageURL
                })
            })
            const membersData = {members: _.uniqBy(membersList, "id")}
            res.json({membersData: membersData})
        })
        .catch(function(error){
            res.status(201).json({message: 'Error'})
            // console.log('Opps sorry budda mil gaya :', error)
        })
}

export default handler