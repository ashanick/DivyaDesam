import _ from "lodash";
var neo4j = require('neo4j-driver');
var driver = neo4j.driver(
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "kXQvU8aeNdreD6LeEdSPtA29TlwHz2LgvN2OoM2brl0")
  );

var session = driver.session();
export default function handler({query: {memoryName}}, res) {
    console.log('Memory Name API : ', memoryName)

    var searchStatement = "OPTIONAL MATCH pathmem = (m:Memories {memid: '" + memoryName + "'})-[r:MEMORY_TAG]-(n:Member) RETURN m, n"
    console.log('Search Statement with variable', searchStatement)
    
    var memoriesDetail = []
    var taggedMembers = []
    var firstnode = true
    session
    .run(`${searchStatement}`)
    .then(function(result){
        // console.log('In Success') 
        if (result.records.length === 0) {
            res.status(201)
            .json({message: "Oppps Error Not Found but correct search"})
        } else {
            result.records.forEach(function(record) {
                // console.log('Record 0 : ', record._fields[0])
                // console.log('Record FIELD  1 : ', record._fields[1])
                if (firstnode) {
                    // console.log('Writing Memory')
                    firstnode = false
                    memoriesDetail.push({
                        title: record._fields[0].properties.title,
                        description1: record._fields[0].properties.description1,
                        heading2: record._fields[0].properties.heading2,
                        description2: record._fields[0].properties.description2,
                        heading3: record._fields[0].properties.heading3,
                        description3: record._fields[0].properties.description3,
                        name:record._fields[0].properties.name,
                    })
                }
                taggedMembers.push({
                    name:record._fields[1].properties.name,
                    imageURL:record._fields[1].properties.imageURL,
                    isPublic:record._fields[1].properties.isPublic
                })
            })
            // console.log('Send Memory Detail : ', memoriesDetail)
            // console.log('Send Tagged Details : ', taggedMembers)
            res.status(200)
            .json({memory: memoriesDetail, tags: taggedMembers})
        }
    })
    .catch (function(error) {
        res.status(201)
        .json({message: "Aiyoo Error", error})
    })
}

