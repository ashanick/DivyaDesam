import dynamic from "next/dynamic";
import classes from "./allusers-graph.module.css"

const NoSSRForceGraph = dynamic(() => import("../../lib/NoSSRForceGraph"), {
    ssr: false,
  });

function AllUsersGraph(props) {
    const graphData = props.items
    console.log('All Users Graph , ', graphData)

    if (!graphData) {
        return <div><h1>Opps waiting</h1></div>
    }
     
    return (
        <div className={classes.item}>
            {/* In Graph */}
            {graphData &&
            <NoSSRForceGraph 
                nodeAutoColorBy={"__typename"}
                nodeLabel={"id"}
                width={1000}
                height={400}
                graphData={graphData} />
            // <NoSSRForceGraph
            //     width={1000}
            //     height={600}
            //     graphData={graphData}
            //     nodeLabel={"id"}
            //     nodeAutoColorBy={"__typename"}
            //     nodeCanvasObject={(node, ctx, globalScale)=> {
            //         const label = node.id;
            //         const fontSize = 16/globalScale;
            //         ctx.font = `${fontSize}px Sans-Serif`;
            //         const textWidth = ctx.measureText(label).width;
            //         const bckgDimensions = [textWidth, fontSize].map(
            //             (n) => n + fontSize * 0.2
            //           );
            //           ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
            //           ctx.fillRect(
            //             node.x - bckgDimensions[0] / 2,
            //             node.y - bckgDimensions[1] / 2,
            //             ...bckgDimensions
            //           );
            //           ctx.textAlign = "center";
            //           ctx.textBaseline = "middle";
            //           ctx.fillStyle = node.color;
            //           ctx.fillText(label, node.x, node.y);
            
            //           node.__bckgDimensions = bckgDimensions;
            //     }}
            // />
            }
        </div>
    )
}

export default AllUsersGraph