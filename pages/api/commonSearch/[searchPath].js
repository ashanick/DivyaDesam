import _ from "lodash";
var neo4j = require('neo4j-driver');
var driver = neo4j.driver(  
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "kXQvU8aeNdreD6LeEdSPtA29TlwHz2LgvN2OoM2brl0")
  );

var session = driver.session();
export default function handler({query: {searchPath}}, res) {
    // console.log('Boom Boom Boom Common Search +++ 💥💥💥💥💥💥💥 V2 Boom : ', searchPath)
    const xx = searchPath.split('+')
    // console.log('XX Splits', xx[0], "ancestry Split: ", xx[1], ' City Split: ', xx[2])
    var searchStatement = '';
    var testString = xx[0].charAt(0).toLowerCase() + xx[0].slice(1)
    // console.log('Converted to Lower Case : ', testString)
     
    // XX[0] part name
    if (xx[0] !== '') {
      searchStatement = "Optional MATCH (m:Member) WHERE toLower(m.name) contains '" + testString + "'"
    } 

    // xx 1 ancestry
    if (xx[1] !== '' && xx[1] !== 'None') {
      // console.log('Ancestry')
      if (xx[0] === ''){
        // console.log('Indiv ancestry : ', xx[1])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:BELONGS_TO]-(c:Cities {name: '" + xx[1] + "'}) "
      } else {
        // console.log('Combined name ancesrty inside loop', xx[1])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:BELONGS_TO]-(c:Cities {name: '" + xx[1] + "'})  WHERE toLower(m.name) contains '" +testString +"'"
      }
    } 

    // xx 2 cities
    if (xx[2] !== '' && xx[2] !== 'None') {
      // console.log('City')
      if (xx[0] === ''){
        // console.log('Indiv city : ', xx[2])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:LIVED_IN]-(c:Cities {name: '" + xx[2] + "'}) "
      } else {
        // console.log('Combined name city', xx[2])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:LIVED_IN]-(c:Cities {name: '" + xx[2] + "'})  WHERE toLower(m.name) contains '" + testString +"'"
      }
    } 

    // xx 3 education
    if (xx[3] !== '' && xx[3] !== 'None') {
      // console.log('Education : ', xx[3])
      const temped = "OPTIONAL MATCH pathmem = (m:Member) -[r:DETAIL_OWN]-(c:Details {education: '" + xx[3] + "'}) "
      if (searchStatement === ''){
        // console.log('Ed 1st clause')
        searchStatement = temped
      } else {
        // console.log('Ed else clause :', searchStatement)
        searchStatement = searchStatement + "AND exists((m)-[:DETAIL_OWN]-(:Details {education: '" + xx[3] + "'}))" 
      }
      // console.log('Education Search : ', searchStatement)
    }

    // xx 4 profession
    if (xx[4] !== '' && xx[4] !== 'None') {
      // console.log('Profession : ', xx[4])
      const temped = "OPTIONAL MATCH pathmem = (m:Member) -[r:DETAIL_OWN]-(c:Details {profession: '" + xx[4] + "'}) "
      if (searchStatement === ''){
        searchStatement = temped
      } else {
        searchStatement = searchStatement + "AND exists((m)-[:DETAIL_OWN]-(:Details {profession: '" + xx[4] + "'}))" 
      }
      // console.log('Education Search : ', searchStatement)
    }

    searchStatement = searchStatement + ' Return m'

    console.log('🙌🙌🤳🤳 Where Clause : ', searchStatement)
    var membersList  = []
    session
      .run(`${searchStatement}`)
      .then(function(result){
        console.log('In success')
        // console.log('Length ' , result.records)

        result.records.forEach(function(record){
          // console.log('Record : ', record._fields[0])
          const temp = record._fields[0]
          // console.log('Temp ', temp)
          if (temp !== null){
            if (record._fields[1]) {
              // console.log('Here I am what', record._fields[1])
            }
            
            membersList.push({
                id: record._fields[0].properties.name,
                name: record._fields[0].properties.name,
                imageURL: record._fields[0].properties.imageURL
            })
          }
        })
        const membersData = {members: _.uniqBy(membersList, "id")}
        // console.log('Members ', membersData)
        if (membersList){
            console.log('Sending members')
            res.status(200)
                .json({membersData: membersData})
        } else {
            console.log('Sending fetch error')
            res.status(201)
            .json({message: "Ioyooo Empty List"})
        }
      })
      .catch(function(error){
          console.log('Kolaveri : ', error)
          res.status(201)
            .json({message: "Ioyooo", error: error})
    })
}