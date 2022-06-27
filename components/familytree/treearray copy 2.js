import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Tree from 'react-d3-tree'
const Tree = dynamic(() => import("react-d3-tree"), {
    ssr: false,
  });

function testIsDesktop() {
    if (typeof window === 'undefined') {
        return true;
    }
    return window.innerWidth >= 825;
}

function useCenteredTree(){
    const [windowInnerHeight, setWindowInnerHeight] = useState();
    const [isDesktopSize, setIsDesktopSize] = useState(testIsDesktop);
    const [windowInnerWidth, setWindowInnerWidth] = useState()
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        function autoResize() {
            setIsDesktopSize(testIsDesktop());
        }
        window.addEventListener('resize', autoResize);
        autoResize();
        return () => window.removeEventListener('resize', autoResize);
    }, [windowInnerWidth])

    useEffect(()=>{
        let autoResize1 = () => {
            // console.log("Is ? Desktop: " + isDesktopSize);
            // console.log('Window Inner Width', window.innerWidth);
            setWindowInnerWidth(window.innerWidth)
            setWindowInnerHeight(window.innerHeight)
            
        }
        autoResize1()
    })
    return [windowInnerWidth, windowInnerHeight];
}

function TreeArray(props){
    var router = useRouter()
    const [width, height] = useCenteredTree();
    const [dim, setDim] = useState()
    const [translate, setTranslate] = useState()
    useEffect(()=>{
        const tempwidth = width
        const tempheight = height
        const tempdim = ({width, height})
        const temptranslate = ({x:width/2, y:height/2})
        setDim(tempdim)
        setTranslate(temptranslate)
        console.log('TempValues : ', tempdim, 'Translate', temptranslate)
        console.log('Dim', dim, 'translate', translate)
    }, [width])

    var familyTreeState = false
    var nodes = props.items
    // console.log('Width: ', width, 'Height', height)
    
    const [familyData, setFamilyData] = useState([])
    useEffect(()=>{
        function convertToTree(layer, parentId = null){
            const vertex = new Map(), others = [];
            layer.forEach(item =>{
                if (item.parentId === parentId) {
                    vertex.set(item.id, {name: item.name});
                } else {
                    others.push(item)
                }
            })

            for (const vertexId of vertex.keys()) {
                const children = convertToTree(others, vertexId);
                if (children.length) {
                    vertex.get(vertexId).children = children
                }
            }

            return [...vertex.values()]
        }
        const temp = convertToTree(nodes);
        // console.log ('Here is my tree', temp)
        setFamilyData(temp)
    },[])

    
    if (familyData.length > 0) {
        familyTreeState = true
    }

    function handleNodeClick(event){
        // console.log('In Node Click', event.data.name)
        const Path = `/users/${event.data.name}`
        router.push(Path)
    }

    return(
        <div>
            {
                familyTreeState && 
            <div id='divtree' style={{ width: '95vw', height: '20rem', alignSelf: 'center', alignItems: 'center'}}>
                <Tree  
                    data={familyData} 
                    pathFunc='step'
                    zoomable={true}
                    translate={{
                        x: 200,
                        y: 200,
                      }}
                      onNodeClick={event=>(handleNodeClick(event))
                      }
                    // dimensions={dim}
                    // collapsible={false}
                    // translate={translate}
                    // width={width}
                    // height='100'
                    orientation={"vertical"} />
            </div>
            }
        </div>
    )
}

export default TreeArray