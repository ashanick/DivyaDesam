import _ from "lodash";
var neo4j = require('neo4j-driver');
var driver = neo4j.driver(
    "neo4j+s://6c5afb5b.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "kXQvU8aeNdreD6LeEdSPtA29TlwHz2LgvN2OoM2brl0")
  );

var session = driver.session();

export default function handler({query: {userName}}, res) {
    console.log(' 🤳🤳🤳User Name Api 6666 =====: ', userName)
   
    var familyTreeList = []
    var userNodes = []
    var userLinks = []
    var memberDetail = []
    var photoList = []
    var children = []
    var grandChildren = []
    var greatGrandChildren = []
    var greatGreatGrandChildren = []
    var greatGreatGreatGrandChildren = []
    var parents = []
    var grandParent = []
    var greatGrandParent = []
    var greatGreatGrandParent = []
    var greatGreatGreatGrandParent = []
    var siblings = []
    var memoriesList = []
    var parentArray = ["Parent1", "Parent2", "Parent3", "Parent4","Parent5", "Parent6", "Parent7", "Parent8"]
    var writeTarget = ""
    var prevLength = 0
    var tempIndex = 0
    var firstNode = true
    var people = false
    var nodeType = "user"
    
    // 0(m)-Member, 1(n)-Member parent of, 2-(path) parent of, 3-directions, 4-
    session
    .run(`OPTIONAL MATCH pathmem = (b:Member {name: '${userName}'}) - [r:MEMORY_OWN] ->(o:Memories) 
        OPTIONAL MATCH pathphoto = (a:Member {name: '${userName}'}) - [w:PHOTO_OWN] ->(q:PhotoGallery)
        OPTIONAL MATCH (m:Member {name: '${userName}'}) 
        OPTIONAL MATCH (j:Details {name: '${userName}'})
        OPTIONAL MATCH pathspouse =(ps:Member {name: '${userName}'})<-[pr:SPOUSE_OF]-(qs:Member)
        OPTIONAL MATCH path=(n:Member {name: '${userName}'})-[:PARENT_OF*1..5]-(p) 
        WITH pathmem, pathphoto, j, q, r, w, m, n, path, pr, ps, qs, range(0,length(path)-1) as index  
        Return m, n, path, [i in index | CASE WHEN nodes(path)[i] = startNode(RELATIONSHIPS(path)[i]) THEN 'incoming' ELSE 'outgoing' END ] as directions, pathmem, r, pathphoto, w, q, j, pr, qs`)    
    .then(function(result){
            // console.log('Got it Records')

            if (result.records.length === 0){
                res.status(201).json({message: "Opps Not Found"})
            } else {
                result.records.forEach(function(record){
                    // console.log('Step 1- Memory field 1 & 4: ')
                   
                    if (record._fields[4]) {
                        if (record._fields[4] !== null && record._fields[5].type ===  "MEMORY_OWN") {
                            // console.log('Field 4 Relations: ', record._fields[4])
                            memoriesList.push({
                                id: record._fields[4].end.properties.memid,
                                title: record._fields[4].end.properties.title,
                                imageURL: record._fields[4].end.properties.imageURL,
                                excerpt: record._fields[4].end.properties.excerpt
                            })
                        }
                    }

                    if (record._fields[6]) {
                        if (record._fields[6] !== null && record._fields[7].type ===  "PHOTO_OWN") {
                            // console.log('Field 7 Photo ', record._fields[7], 'end', record._fields[8].properties)
                            photoList.push({
                                imageURL: record._fields[8].properties.imageURL,
                                pdate: record._fields[8].properties.pdate,
                                id: record._fields[8].properties.id,
                                title: record._fields[8].properties.title
                            })
                        }
                    }
                    // console.log('Entering 1st node')
                    if ( firstNode){
                        firstNode = false
                        prevLength = 0
                        var prof = ""
                        var education = ""
                        var school = ""
                        var earlydescription = ""
                        var hobby = ""
                        var spouse = ""
                        var spouseImageURL = ""
                        var adultdescription = ""
                        var notes = ""
                        var dob = ''
                        if (record._fields[9]){
                            // console.log('Detail Record : ', record._fields[9])
                            prof = record._fields[9].properties.profession
                            education = record._fields[9].properties.education
                            school = record._fields[9].properties.school
                            earlydescription = record._fields[9].properties.earlydescription
                            hobby = record._fields[9].properties.hobby
                            notes = record._fields[9].properties.notes
                            adultdescription = record._fields[9].properties.adultdescription
                            if (record._fields[9].properties.dob){
                                dob = record._fields[9].properties.dob
                            } 
                        }

                        if (record._fields[10]){
                            spouse = record._fields[11].properties.name
                            spouseImageURL = record._fields[11].properties.imageURL
                        }
                        // console.log('Finished spouse')

                        memberDetail.push({
                            id: record._fields[1].properties.name,
                            name: record._fields[1].properties.name,
                            imageURL: record._fields[1].properties.imageURL,
                            profession: prof,
                            education: education,
                            school: school,
                            earlydescription: earlydescription,
                            hobby,
                            spouse,
                            spouseImageURL,
                            notes,
                            adultdescription,
                            dob
                        })
                        userNodes.push({
                            id: record._fields[1].properties.name,
                            name: record._fields[1].properties.name,
                            // __typename: record._fields[1].labels
                            __typename: nodeType
                        })
                        parentArray[0] = record._fields[1].properties.name
                        // console.log('Pushed User Nodes')
                        familyTreeList.push({
                            name: record._fields[1].properties.name,
                            parentId: null,
                            type: "Parent",
                            id: record._fields[1].properties.name,
                        })
                    }

                    // console.log('Family tree : ', familyTree)
                    if (record._fields[2]){
                        tempIndex = record._fields[2].length -1

                        if (prevLength < record._fields[2].length) {
                            writeTarget = record._fields[2].end.properties.name
                            prevLength = record._fields[2].length
                        }

                        if (prevLength === record._fields[2].length) {
                            // console.log('Coming to write')
                            // console.log('Source : ', parentArray[tempIndex])
                            // console.log('Target : ', writeTarget)
                            // console.log("node", writeTarget, record._fields[2].length )

                            // ***************** This was removed cos I took out the Graph from Individual
                            // if (record._fields[2].length < 3) {
                            //     userNodes.push({
                            //         id: writeTarget,
                            //         name: writeTarget,
                            //         // __typename: record._fields[2].labels
                            //         __typename: nodeType
                            //     })
                            //     userLinks.push({
                            //         source: parentArray[tempIndex],
                            //         target: writeTarget
                            //     })
                            // }

                            //***************************** */
                            prevLength = 0
                            parentArray[record._fields[2].length] = writeTarget
                        }

                        if (prevLength > record._fields[2].length) {
                            // console.log('How did this happen')
                        }

                        people = false
                        if (record._fields[3].length === 1) {
                            people = true
                        } else {
                            if (record._fields[3][0] === record._fields[3][1]) {
                                people = true
                            }
                        }
                        
                        if (people) {
                            
                            if (record._fields[2].length === 1) {
                                if (record._fields[3][0] === "incoming"){
                                    // console.log('Children Record Fields 2', record._fields[2].start.properties.name, record._fields[2].end.properties.name )
                                    children.push ({
                                        name: record._fields[2].end.properties.name,
                                        imageURL: record._fields[2].end.properties.imageURL 
                                    })
                                    nodeType="children"

                                    // For Family Tree Added June 20
                                    familyTreeList.push({
                                        name: record._fields[2].end.properties.name,
                                        parentId: record._fields[2].start.properties.name,
                                        type: "Child",
                                        id: record._fields[2].end.properties.name,
                                    })
                                } 
                                if (record._fields[3][0] === "outgoing" ){
                                    // console.log('Parents : ', record._fields[2].end)
                                    parents.push({
                                        name: record._fields[2].end.properties.name,
                                        imageURL: record._fields[2].end.properties.imageURL 
                                    })
                                    nodeType="parent"
                                }
                            }
        
                            if (record._fields[2].length === 2) {
                                if (record._fields[3][0] === "incoming"){
                                    grandChildren.push ({
                                        name: record._fields[2].end.properties.name,
                                        imageURL: record._fields[2].end.properties.imageURL 
                                    })
                                    nodeType="grandChildren"
                                    familyTreeList.push({
                                        name: record._fields[2].end.properties.name,
                                        parentId: parentArray[tempIndex],
                                        type: "GrandChild",
                                        id: record._fields[2].end.properties.name,
                                    })
                                    // console.log('Grand Children ', record._fields[2].start.properties.name, record._fields[2].end.properties.name )
                                }   
                                if (record._fields[3][0] === "outgoing"){
                                    grandParent.push({
                                        name: record._fields[2].end.properties.name,
                                        imageURL: record._fields[2].end.properties.imageURL 
                                    })
                                    nodeType="grandParent"
                                }
                            }

                            if (record._fields[2].length === 3) {
                                // console.log('Field length = 3 ', record._fields[1], record._fields[2].end.properties.name, record._fields[3])
                                if (record._fields[3][0] === "incoming" && record._fields[3][1] === "incoming" && record._fields[3][2] === "incoming"){
                                    greatGrandChildren.push ({
                                        name: record._fields[2].end.properties.name
                                    })
                                    nodeType="greatGrandChildren"
                                }   
                                if (record._fields[3][0] === "outgoing" && record._fields[3][1] === "outgoing" && record._fields[3][2] === "outgoing"){
                                    greatGrandParent.push({
                                        name: record._fields[2].end.properties.name 
                                    })
                                    nodeType="greatGrandParent"
                                }
                            }

                            if (record._fields[2].length === 4) {
                                // console.log('Field length = 4 ', record._fields[1], record._fields[2].end.properties.name, record._fields[3])
                                if (record._fields[3][0] === "incoming" && record._fields[3][1] === "incoming" && record._fields[3][2] === "incoming" && record._fields[3][3] === "incoming"){
                                    // console.log('GGC')
                                    greatGreatGrandChildren.push ({
                                        name: record._fields[2].end.properties.name
                                    })
                                    nodeType="greatGreatGrandChildren"
                                }   
                                if (record._fields[3][0] === "outgoing" && record._fields[3][1] === "outgoing" && record._fields[3][2] === "outgoing" && record._fields[3][3] === "outgoing"){
                                    // console.log('GGP Push')
                                    greatGreatGrandParent.push({
                                        name: record._fields[2].end.properties.name 
                                    })
                                    nodeType="greatGreatGrandParent"
                                }
                            }
                            if (record._fields[2].length === 5) {
                                // console.log('Field length = 4 ', record._fields[1], record._fields[2].end.properties.name, record._fields[3])
                                if (record._fields[3][0] === "incoming" && record._fields[3][1] === "incoming" && record._fields[3][2] === "incoming" && record._fields[3][3] === "incoming" && record._fields[3][4] === "incoming"){
                                    // console.log('GGC')
                                    greatGreatGreatGrandChildren.push ({
                                        name: record._fields[2].end.properties.name
                                    })
                                    nodeType="greatGreatGreatGrandChildren"
                                }   
                                if (record._fields[3][0] === "outgoing" && record._fields[3][1] === "outgoing" && record._fields[3][2] === "outgoing" && record._fields[3][3] === "outgoing" && record._fields[3][4] === "outgoing"){
                                    // console.log('GGP Push')
                                    greatGreatGreatGrandParent.push({
                                        name: record._fields[2].end.properties.name 
                                    })
                                    nodeType="greatGreatGreatGrandParent"
                                }
                            }
                        }

                        if (record._fields[3][0] === "outgoing" && record._fields[3][1] === "incoming" && record._fields[2].length === 2) {
                            // console.log('Sibling, ', record._fields[3])
                            // console.log('Sibling, ', record._fields[2])
                            siblings.push({
                                name: record._fields[2].end.properties.name 
                            })
                            nodeType="siblings"
                        }
                        if (record._fields[2].length === 2) {
                        }
                    }
                })
            }
            
            const data =  {nodes:_.uniqBy(userNodes, "id"),
                    links: userLinks
                    }
            // console.log('Details : ', memberDetail)
            
            const member = {member: memberDetail, 
                children:_.uniqBy( children, "name"), grandChildren: _.uniqBy(grandChildren, "name"), 
                parents: _.uniqBy(parents, "name"), grandParent: _.uniqBy(grandParent, "name"),
                greatGrandParent: _.uniqBy(greatGrandParent, "name"), greatGrandChildren: _.uniqBy(greatGrandChildren, "name"),
                greatGreatGrandParent: _.uniqBy(greatGreatGrandParent, "name"), greatGreatGrandChildren: _.uniqBy(greatGreatGrandChildren, "name"),
                greatGreatGreatGrandParent: _.uniqBy(greatGreatGreatGrandParent, "name"), greatGreatGreatGrandChildren: _.uniqBy(greatGreatGreatGrandChildren, "name"),
                siblings: _.uniqBy(siblings, "name")
            }
            console.log('Before Family Tree')
            // const familyTree = {familyTree: _uniqBy(familyTreeList, "id")}
            // const familyTree = {familyTree: _.uniqBy(familyTreeList, "name")}
            const memories = {memories: _.uniqBy(memoriesList, "title")}
            const photoGallery = {photoList: _.uniqBy(photoList, "title")}
            // console.log('Family Tree', familyTreeList)
            // console.log('Children ', children, grandChildren, 'GrandChildren : ')
            // console.log('Parent : ', parents, 'Grandparent ', grandParent)
            // console.log('Siblings ', siblings)
            // console.log('Memories : ', memories)
            // console.log('En Fin With Individual User: 🙌🙌🙌🙌💥💥💥💥💥💥😎😎😎😎😎 ')
            if (firstNode) {
                res.status(201).json({message: "Opps Not Found"})
            } else {
                res.json({data: data, member: member, memories: memories, photoGallery: photoGallery, familyTree: familyTreeList})
            }
        }) .catch(function(error){
            // console.log("Hey airaaa", error);
            res.status(201).json('Error in finding Data')
        });
  }