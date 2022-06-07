import _ from "lodash";
var neo4j = require('neo4j-driver');
const uname = process.env.neo4j_username
// console.log('UserName ', uname)
var driver = neo4j.driver(  
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic(process.env.neo4j_username, process.env.neo4j_password)
  );
// console.log('Driver', driver)
var session = driver.session();
export default function handler({query: {searchPath}}, res) {
    console.log('Boom Boom Boom Common Search +++ 💥💥💥💥💥💥💥 V2 Boom : ', searchPath)
    const xx = searchPath.split('+')
    // console.log('XX Splits', xx[0], "ancestry Split: ", xx[1], ' City Split: ', xx[2])
    var searchStatement = '';
    var testString = xx[0].charAt(0).toLowerCase() + xx[0].slice(1)
    var msg
    // console.log('Converted to Lower Case : ', testString)
     
    // XX[0] part name
    if (xx[0] !== '') {
      searchStatement = "Optional MATCH (m:Member) WHERE toLower(m.name) contains '" + testString + "'"
    } 
    for (let i = 0; i < 5; i++){
      if (xx[i] === 'None' || xx[i] === 'undefined') {
        xx[i] = ''
        msg = msg + i + ' replace'
      }
    }

    // xx 1 ancestry
    if (xx[1] !== '') {
      // console.log('Ancestry')
      if (xx[0] === '' ){
        // console.log('Indiv ancestry : ', xx[1])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:BELONGS_TO]-(c:Cities {name: '" + xx[1] + "'}) "
      } else {
        // console.log('Combined name ancesrty inside loop', xx[1])
        searchStatement = "OPTIONAL MATCH pathmem = (m:Member) -[r:BELONGS_TO]-(c:Cities {name: '" + xx[1] + "'})  WHERE toLower(m.name) contains '" +testString +"'"
      }
    } 

    // xx 2 cities
    if (xx[2] !== '') {
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
    if (xx[3] !== '') {
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
    if (xx[4] !== '' ) {
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

    // console.log('🙌🙌🤳🤳 Where Clause : ', searchStatement)
    msg = 'SearchStatement : ' + searchStatement + ' '
    var membersList  = []
    session
      .run(`${searchStatement}`)
      .then(function(result){
          if (result.records.length === 0){
            res.status(201).json({message: "Opps Not Found", msg})
          } else {
        result.records.forEach(function(record){
          msg = msg + 'In success : ' + result.records.length
          // console.log('Record : ', record._fields[0])
          msg = msg + "In records length : " + record._fields + ' ' 
        //   console.log('Record ', record._fields[0])
          if (record._fields[0] !== null){
                msg = msg + " Not null : " + record._fields[0].properties.name + ' : '
            if (record._fields[1]) {
              // console.log('Here I am what', record._fields[1])
            }
            
            membersList.push({
                id: record._fields[0].properties.name,
                name: record._fields[0].properties.name,
                imageURL: record._fields[0].properties.imageURL
            })
          }

          msg = msg + " Pushing "
        })

        const membersData = {members: _.uniqBy(membersList, "id")}
        msg = msg + " Total member tried : " + membersData.members.length
        // console.log('Members ', msg)
        // if (membersData){
            // console.log('There is data', membersData)
        // }
        if (membersData){
            // console.log('Stupid Come here : ', membersData)
            res.status(200)
                .json({membersData: membersData, status: 200, msg})
        } 
      }
      })
      .catch(function(error){
          // console.log('Kolaveri : ', error)
          res.status(201)
            .json({message: "Ioyooo in Catch Error", error: error, status: 201, msg})
    })
}