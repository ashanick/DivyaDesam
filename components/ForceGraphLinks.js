import dynamic from "next/dynamic";
// import NoSSRForceGraph from '../lib/NoSSRForceGraph'

const NoSSRForceGraph = dynamic(() => import("../lib/NoSSRForceGraph"), {
    ssr: false,
  });

const gData = {
    nodes: [
        {id: "Asha Sundararajan", group: "1", __typename: "main"},
        {id: "Nicky Ranganathan", group: "1", __typename: "main"},
        {id: "Ranjani Ramaswamy", group: "2", __typename: "aunt"},
        {id: "Suresh Varadarajan", group: "3", __typename: "cousin"},
        {id: "Kala Suresh", "group": "3", __typename: "cousin"}
    ],
    links: [
        {source: "Asha Sundararajan", target: "Suresh Varadarajan", value: 1},
        {source: "Asha Sundararajan", target: "Ranjani Ramaswamy", value: 1},
        {source: "Ranjani Ramaswamy", target: "Nicky Ranganathan", value: 2}
    ]
}

const myData = {
    nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    links: [
      { source: 'a', target: 'b' },
      { source: 'c', target: 'a' }
    ]
  };

function ForceGraphLinks({item}) {
    // console.log('FG : ',  item)

    if (!item){
        return <div><h1>Ooops</h1></div>
    }

  return (
     <NoSSRForceGraph graphData={myData} />
  )
}

export default ForceGraphLinks